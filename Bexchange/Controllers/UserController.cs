using AutoMapper;
using Bexchange.Domain.DtoModels;
using Bexchange.Infrastructure.Repositories.Interfaces;
using Bexchange.Infrastructure.Services;
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
        private readonly IUserService _userService;

        public UserController(IHttpClientFactory httpClientFactory, IUsersRepository<User> usersRepository, IUserService userService)
        {
            _httpClientFactory = httpClientFactory;
            _usersRepository = usersRepository;
            _userService = userService;
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
        [HttpPost("login/email")]
        public async Task<IActionResult> LoginWithEmail(LoginUserDTO user)
        {
            var jwtApiClient = _httpClientFactory.CreateClient();

            var responce = await jwtApiClient.PostAsJsonAsync("https://localhost:9266/api/user/login/email", user);
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

        [AllowAnonymous]
        [HttpPost("login/name")]
        public async Task<IActionResult> LoginWithName(LoginUserDTO user)
        {
            var jwtApiClient = _httpClientFactory.CreateClient();

            var responce = await jwtApiClient.PostAsJsonAsync("https://localhost:9266/api/user/login/name", user);
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

            var responce = await jwtApiClient.PostAsJsonAsync("https://localhost:9266/api/user/refresh-token", _userService.GetUserId(HttpContext)) ;
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
    }
}
