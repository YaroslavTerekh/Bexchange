using AutoMapper;
using Bexchange.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Domain.DtoModels;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BexchangeAPI.Controllers
{
    [Authorize(Policy = "Admins")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IUsersRepository<User> _usersRepository;

        public UserController(IHttpClientFactory httpClientFactory, IUsersRepository<User> usersRepository)
        {
            _httpClientFactory = httpClientFactory;
            _usersRepository = usersRepository;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO user)
        {
            var jwtApiClient = _httpClientFactory.CreateClient();

            var responce = await jwtApiClient.PostAsJsonAsync("https://localhost:9266/api/user/register", user);

            return Ok(responce);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDTO user)
        {
            var jwtApiClient = _httpClientFactory.CreateClient();

            var responce = await jwtApiClient.PostAsJsonAsync("https://localhost:9266/api/user/login", user);
            var token = await responce.Content.ReadAsStringAsync();

            return Ok(token);
        }

        //TEST
        [HttpGet]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _usersRepository.GetUserAsync(id);
            return Ok(user);
        }
    }
}
