using Bexchange.Infrastructure.Repositories.Interfaces;
using Bexchange.Infrastructure.Services;
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
        private readonly IUserService _userService;

        public AdminController(IUsersRepository<User> usersRepository, IContentRepository<Book> contentRepository, IUserService userService)
        {
            _usersRepository = usersRepository;
            _contentRepository = contentRepository;
            _userService = userService;
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

        [HttpPatch("ban/{id}")]
        public async Task<IActionResult> BanUser(int id)
        {
            if (id != _userService.GetUserId(HttpContext)) {
                await _usersRepository.BanUserAsync(id);

                return Ok($"User with id {id} has been banned");
            }

            return BadRequest("You can't ban yourself");
        }

        [HttpPatch("book/state/{id}/{state}")]
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

    }
}
