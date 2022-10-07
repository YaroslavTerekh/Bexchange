using Bexchange.Domain;
using Bexchange.Domain.RequestModels;
using Bexchange.Infrastructure.Repositories.Interfaces;
using Bexchange.Infrastructure.Services.Repositories;
using BexchangeAPI.Domain.CustomExceptions;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bexchange.API.Controllers
{
    [Authorize(Policy = "Admins")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUsersRepository<User> _usersRepository;
        private readonly IBookContentRepository<Book> _contentRepository;
        private readonly IUserService _userService;

        public AdminController(IUsersRepository<User> usersRepository, IBookContentRepository<Book> contentRepository, IUserService userService)
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

        [HttpGet("users/last")]
        public async Task<IActionResult> GetLastDaysUsers()
        {
            return Ok(await _usersRepository.GetLastUsersAsync());
        }

        [HttpGet("users/{name}")]
        public async Task<IActionResult> GetUserByName(string name)
        {
            var user = await _usersRepository.GetUserByNameAsync(name);

            if (user == null)
                throw new NotFoundException("user not found", StatusCodes.Status404NotFound);

            return Ok(user);
        }

        [HttpGet("users/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _usersRepository.GetUserByEmailAsync(email);

            if (user == null)
                throw new NotFoundException("user not found", StatusCodes.Status404NotFound);
            return Ok(user);
        }

        [HttpPatch("ban/{id}")]
        public async Task<IActionResult> BanUser(int id)
        {
            if (id != _userService.GetUserId(HttpContext)) {
                await _usersRepository.BanUserAsync(id);

                return Ok();
            }

            return BadRequest("You can't ban yourself");
        }

        [HttpPatch("unban/{id}")]
        public async Task<IActionResult> UnbanUser(int id)
        {
            await _usersRepository.UnbanUserAsync(id);
            return Ok();
        }

        [HttpPatch("book/state/{id}/{state}")]
        public async Task<IActionResult> ModifyStateBook(int id, State state)
        {
            await _contentRepository.ModifyComponentStateAsync(id, state);

            return NoContent();
        }

        [HttpPatch("role/{id}/{role}")]
        public async Task<IActionResult> ChangeUserRole(Roles role, int id)
        {
            await _usersRepository.ChangeRoleAsync(role, id);

            return Ok();
        }

        //SuperAdmin part

        [HttpGet("admins"), Authorize(Policy = PoliciesConstants.SuperAdmins)]
        public async Task<IActionResult> GetAdmins()
        {
            return Ok(await _usersRepository.GetAdminsOnlyAsync());
        }        

        [HttpPut("modify/{id}"), Authorize(Policy = PoliciesConstants.SuperAdmins)]
        public async Task<IActionResult> ModifyUser(ChangeUserInfoRequest user)
        {
            await _usersRepository.ModifyUserAsync(user);
            return Ok("Modified successfully");
        }

    }
}
