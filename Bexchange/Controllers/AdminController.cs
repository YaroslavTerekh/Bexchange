using Bexchange.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bexchange.API.Controllers
{
    [Authorize(Policy = "Admins")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUsersRepository<User> _usersRepository;

        public AdminController(IUsersRepository<User> usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _usersRepository.GetAllUsersAsync());
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _usersRepository.GetUserAsync(id);
            return Ok(user);
        }

        [HttpGet("users/get/{nameOrEmail}")]
        public async Task<IActionResult> GetUserByNameOrEmail(string nameOrEmail)
        {
            if (nameOrEmail.Contains("@"))
            {
                var user = await _usersRepository.GetUserByEmailAsync(nameOrEmail);
                return Ok(user);
            }
            else
            {
                var user = await _usersRepository.GetUserByNameAsync(nameOrEmail);
                return Ok(user);
            }
        }

        [HttpPut("ban/{id}")]
        public async Task<IActionResult> BanUser(int id)
        {
            await _usersRepository.BanUserAsync(id);

            return Ok($"User with id {id} has been banned");
        }

        //SuperAdmin part

        [HttpGet("admins"), Authorize(Policy = "SuperAdmin")]
        public async Task<IActionResult> GetAdmins()
        {
            return Ok(await _usersRepository.GetAdminsOnlyAsync());
        }

        [HttpPut("role/{id}/{role}"), Authorize(Policy = "SuperAdmin")]
        public async Task<IActionResult> ChangeUserRole(Roles role, int id)
        {
            await _usersRepository.ChangeRoleAsync(role, id);

            return Ok("Successfully changed the role");
        }

        [HttpPut("users/modify/{id}"), Authorize(Policy = "SuperAdmin")]
        public async Task<IActionResult> ModifyUser(User user)
        {
            await _usersRepository.ModifyUserAsync(user);
            return Ok("Modified successfully");
        }
    }
}
