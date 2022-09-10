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
using Microsoft.AspNetCore.Identity;

namespace Bexchange.Jwt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class UserController : ControllerBase
    {
        private readonly IUsersRepository<User> _usersRepository;
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserController(IUsersRepository<User> usersRepository, IConfiguration configuration,
            UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _usersRepository = usersRepository;
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDTO user)
        {
            if(await TestUserSearchAsync(user))
            {
                return BadRequest("User already exists");
            }

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
                
                Role = Roles.User
            };

            var result = await _userManager.CreateAsync(mappedUser, user.Password);

            if(result.Succeeded)
            {
                return Ok(mappedUser);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login/name")]
        public async Task<ActionResult<string>> LoginWithName(LoginUserDTO loginUser)
        {
            User user = await _usersRepository.GetUserByNameAsync(loginUser.UserName);

            if (user == null)
                return BadRequest("Wrong name");

            var result = _signInManager.CanSignInAsync(user);

            if (!result.Result)
                return BadRequest("Wrong password");

            var token = await CreateTokenAsync(user);

            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, user);

            return Ok(token);
        }

        [HttpPost("login/email")]
        public async Task<ActionResult<string>> LoginWithEmail(LoginUserDTO loginUser)
        {
            User user = await _usersRepository.GetUserByEmailAsync(loginUser.UserName);

            if (user == null)
                return BadRequest("Wrong e-mail");

            var result = _signInManager.CanSignInAsync(user);

            if (!result.Result)
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

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
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

    }
}
