using Bexchange.Jwt.API.Models.DtoModels;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Infrastructure.DtbContext;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace Bexchange.Jwt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IContentRepository<User> _usersRepository;

        public UserController(IContentRepository<User> usersRepository)
        {
            _usersRepository = usersRepository;
        }
        public async Task<IActionResult> Register(UserDTO user)
        {
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

            await _usersRepository.AddComponent(mappedUser);

            return Ok();
        }

        private void CreatePasswordHash(string password, out byte[] passHash, out byte[] passSalt)
        {
            using(var hmac = new HMACSHA256())
            {
                passSalt = hmac.Key;
                passHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));                 
            }
        }
    }
}
