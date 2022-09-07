using AutoMapper;
using Bexchange.Domain.DtoModels;
using Bexchange.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Domain.DtoModels;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BexchangeAPI.Controllers
{
    [Authorize]
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

            var refreshToken = responce.Headers.GetValues("token").ToArray()[0].ToString();
            var refreshTokenExp = DateTime.Parse(responce.Headers.GetValues("tokenExp").ToArray()[0].ToString());

            var cookieOpts = new CookieOptions
            {
                HttpOnly = true,
                IsEssential = true,
                Expires = refreshTokenExp,
                Secure = true,
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOpts);

            return Ok(token);
        }

        [Authorize]
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var jwtApiClient = _httpClientFactory.CreateClient();

            var responce = await jwtApiClient.PostAsJsonAsync("https://localhost:9266/api/user/refresh-token", new IdDTO { id = GetUserId() }) ;
            var token = await responce.Content.ReadAsStringAsync();

            var refreshToken = responce.Headers.GetValues("token").ToArray()[0].ToString();
            var refreshTokenExp = DateTime.Parse(responce.Headers.GetValues("tokenExp").ToArray()[0].ToString());

            var cookieOpts = new CookieOptions
            {
                HttpOnly = true,
                IsEssential = true,
                Expires = refreshTokenExp,
                Secure = true,
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOpts);

            return Ok(token);
        }

        private int GetUserId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var id = identity.FindFirst("Id").Value;
            return Int32.Parse(id);
        }
    }
}
