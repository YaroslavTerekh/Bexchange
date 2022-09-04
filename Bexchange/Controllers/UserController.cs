using AutoMapper;
using BexchangeAPI.Domain.DtoModels;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BexchangeAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public UserController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
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
    }
}
