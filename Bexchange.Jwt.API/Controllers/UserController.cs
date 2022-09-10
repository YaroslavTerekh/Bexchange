using BexchangeAPI.Domain.DtoModels;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Infrastructure.DtbContext;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Bexchange.Infrastructure.Repositories.Interfaces;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Bexchange.Domain.DtoModels;
using Microsoft.AspNetCore.Cors;

namespace Bexchange.Jwt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class UserController : ControllerBase
    {
        private readonly IUsersRepository<User> _usersRepository;
        private readonly IConfiguration _configuration;

        public UserController(IUsersRepository<User> usersRepository, IConfiguration configuration)
        {
            _usersRepository = usersRepository;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDTO user)
        {
            if(await TestUserSearchAsync(user))
            {
                return BadRequest("User already exists");
            }

            byte[] passHash = null;
            byte[] passSalt = null;

            CreatePasswordHash(user.Password, out passHash, out passSalt);

            User mappedUser = new User {
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Address = new AddressInfo
                {
                    Country = user.AddressInfo.Country,
                    City = user.AddressInfo.City,
                    PostIndex = user.AddressInfo.PostIndex,
                },
                PasswordHash = passHash,
                PasswordSalt = passSalt,
                Role = Roles.User
            };

            await _usersRepository.RegisterUserAsync(mappedUser);

            return mappedUser;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginUserDTO loginUser)
        {
            User user;

            if (loginUser.UserName.Contains("@"))
            {
                user = await _usersRepository.GetUserByEmailAsync(loginUser.UserName);
            }
            else
            {
                user = await _usersRepository.GetUserByNameAsync(loginUser.UserName);
            }

            if (user == null)
                return BadRequest("Wrong username or e-mail");

            if (!VerifyPasswordHash(loginUser.Password, user.PasswordHash, user.PasswordSalt))
                return BadRequest("Wrong password");

            var token = await CreateTokenAsync(user);

            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, user);

            return Ok(token);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken([FromBody]int id)
        {
            var user = await _usersRepository.GetUserAsync(id);

            var refreshToken = Request.Cookies["refreshToken"];

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = CreateToken(user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, user);

            return Ok(token);
        }

        [HttpGet]
        public async Task<IActionResult> GetUser(int id)
        {
            return Ok(await _usersRepository.GetUserAsync(id));
        }
        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                CreateTime = DateTime.Now
            };

            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken token, User user)
        {
            var cookieOpts = new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly = true,
                Expires = token.Expires,
                IsEssential = true,
                Secure = true,
            };

            Response.Cookies.Append("refreshToken", token.Token, cookieOpts);

            Response.Headers.Add("token", token.Token);
            Response.Headers.Add("tokenExp", token.Expires.ToString());

            user.RefreshToken = token.Token;
            user.TokenCreated = token.CreateTime;
            user.TokenExpires = token.Expires;

            _usersRepository.SaveUser();
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        private void CreatePasswordHash(string password, out byte[] passHash, out byte[] passSalt)
        {
            using(var hmac = new HMACSHA256())
            {
                passSalt = hmac.Key;
                passHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));                 
            }
        }
        private async Task<bool> TestUserSearchAsync(UserDTO user)
        {
            var testSearchUser = await _usersRepository.GetUserByNameAsync(user.UserName);
            if (testSearchUser != null)
                return true;

            testSearchUser = await _usersRepository.GetUserByEmailAsync(user.Email);
            if (testSearchUser != null)
                return true;

            return false;
        }
        private bool VerifyPasswordHash(string password, byte[] passHash, byte[] passSalt)
        {
            using(var hmac = new HMACSHA256(passSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passHash);
            }
        }
        private async Task<string> CreateTokenAsync(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(type: "Id", value: user.Id.ToString()),
                new Claim(type: "AddressId", value: user.AddressId.ToString()),
                new Claim(ClaimTypes.Name, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt.ToString();
        }
        private int GetUserId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var id = identity.FindFirst("id").Value;
            return Int32.Parse(id);
        }

    }
}
