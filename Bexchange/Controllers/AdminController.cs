using Bexchange.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Bexchange.API.Controllers
{
    [Authorize(Policy = "Admins")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUsersRepository<User> _usersRepository;
        private readonly IContentRepository<Book> _contentRepository;

        public AdminController(IUsersRepository<User> usersRepository, IContentRepository<Book> contentRepository)
        {
            _usersRepository = usersRepository;
            _contentRepository = contentRepository;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _usersRepository.GetAllUsersAsync());
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _usersRepository.GetUserAsync(id);
            return Ok(user);
        }

        [HttpGet("uore/{nameOrEmail}")]
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
            if (id != GetUserId()) {
                await _usersRepository.BanUserAsync(id);

                return Ok($"User with id {id} has been banned");
            }

            return BadRequest("You can't ban yourself");
        }

        [HttpPut("book/state/{id}/{state}")]
        public async Task<IActionResult> AcceptBook(int id, State state)
        {
            await _contentRepository.ModifyComponentStateAsync(id, state);

            return Ok("Successfully modified state");
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

        [HttpPut("modify/{id}"), Authorize(Policy = "SuperAdmin")]
        public async Task<IActionResult> ModifyUser(User user)
        {
            await _usersRepository.ModifyUserAsync(user);
            return Ok("Modified successfully");
        }

        private int GetUserId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var id = identity.FindFirst("Id").Value;
            return Int32.Parse(id);
        }
    }
}
