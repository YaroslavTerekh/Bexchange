using Bexchange.Domain;
using Bexchange.Domain.Models;
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
        public async Task<IActionResult> GetAllUsers(CancellationToken token = default)
        {
            return Ok(await _usersRepository.GetAllUsersAsync(token));
        }

        [HttpGet("users/last")] 
        public async Task<IActionResult> GetLastDaysUsers(CancellationToken token = default)
        {
            return Ok(await _usersRepository.GetLastUsersAsync(token));
        }

        [HttpPatch("ban/{id}")] 
        public async Task<IActionResult> BanUser(int id, CancellationToken token = default)
        {
            if (id != _userService.GetUserId(HttpContext)) {
                await _usersRepository.BanUserAsync(id, token);

                return Ok();
            }

            return BadRequest("You can't ban yourself");
        }

        [HttpPatch("unban/{id}")] 
        public async Task<IActionResult> UnbanUser(int id, CancellationToken token = default)
        {
            await _usersRepository.UnbanUserAsync(id, token);
            return Ok();
        }

        [HttpPatch("book/state/{id}/{state}")]
        public async Task<IActionResult> ModifyStateBook(int id, State state, CancellationToken token = default)
        {
            await _contentRepository.ModifyComponentStateAsync(id, state, token);

            return NoContent();
        }

        [HttpPatch("role/{id}/{role}")] 
        public async Task<IActionResult> ChangeUserRole(Roles role, int id, CancellationToken token = default)
        {
            await _usersRepository.ChangeRoleAsync(role, id, token);

            return Ok();
        }

        [HttpPost("authors/modify")] 
        public async Task<IActionResult> ModifyAuthor(Author author, CancellationToken token = default)
        {
            await _contentRepository.ModifyAuthorAsync(author, token);
            return Ok();
        }

        [HttpGet("admins"), Authorize(Policy = PoliciesConstants.SuperAdmins)] 
        public async Task<IActionResult> GetAdmins(CancellationToken token = default)
        {
            return Ok(await _usersRepository.GetAdminsOnlyAsync(token));
        }        

    }
}
