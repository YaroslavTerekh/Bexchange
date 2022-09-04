using Bexchange.Jwt.API.Models.DtoModels;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Infrastructure.DtbContext;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Bexchange.Infrastructure.Repositories.Interfaces;

namespace Bexchange.Jwt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsersRepository<User> _usersRepository;

        public UserController(IUsersRepository<User> usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO user)
        {
            if(await TestUserSearchAsync(user))
            {
                return BadRequest("User already exists");
            }

            byte[] passHash = null;
            byte[] passSalt = null;

            CreatePasswordHash(user.Password, out passHash, out passSalt);

            User mappedUser = new User {
                NickName = user.NickName,
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

            return Ok(mappedUser);
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

            if (VerifyPasswordHash(loginUser.Password, user.PasswordHash, user.PasswordSalt))
                return BadRequest("Wrong password");

            return Ok("MY TOKEN");
        }

        [HttpGet]
        public async Task<IActionResult> GetUser(int id)
        {
            return Ok(await _usersRepository.GetUserAsync(id));
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
            var testSearchUser = await _usersRepository.GetUserByNameAsync(user.NickName);
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
    }
}
