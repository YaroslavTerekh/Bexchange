using AutoMapper;
using Bexchange.Domain.RequestModels;
using Bexchange.Infrastructure.Repositories.Interfaces;
using Bexchange.Infrastructure.Services.Repositories;
using BexchangeAPI.Domain.DtoModels;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.DTOs;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BexchangeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsersRepository<User> _usersRepository;
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public UserController(IUsersRepository<User> usersRepository, IUserService userService, IConfiguration configuration,
                                UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _usersRepository = usersRepository;
            _userService = userService;
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Authorize]
        [HttpGet("id/{id}")] 
        public async Task<IActionResult> GetUser(int id)
        {
            if(_userService.GetUserId(HttpContext) == id || _userService.IsAdmin(HttpContext))
            {
                var user = await _usersRepository.GetUserAsync(id);
                return Ok(user);
            }

            return BadRequest("Access forbidden");
        }

        [Authorize]
        [HttpPost("modify")] 
        public async Task<IActionResult> ModifyUser(ChangeUserInfoRequest user)
        {
            await _usersRepository.ModifyUserAsync(user);
            return Ok();
        }

        [HttpPost("register")] 
        public async Task<IActionResult> Register(UserRequest user)
        {
            if (await _userService.TestUserSearchAsync(user, _usersRepository))
            {
                return BadRequest("User already exists");
            }

            User mappedUser = new User
            {
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

                Role = Roles.User
            };

            var result = await _userManager.CreateAsync(mappedUser, user.Password);

            if (result.Succeeded)
            {
                return Ok(mappedUser);
            }

            return BadRequest(result.Errors.ToArray()[0].Description);
        }

        [HttpPost("login/email")] 
        public async Task<ActionResult<string>> LoginWithEmail(LoginRequest loginUser)
        {
            User user = await _usersRepository.GetUserByEmailAsync(loginUser.UserName);

            if (user == null)
                return BadRequest("Wrong e-mail");

            var result = _signInManager.CheckPasswordSignInAsync(user, loginUser.Password, false);

            if (!result.Result.Succeeded)
                return BadRequest("Wrong password");

            var token = await _userService.CreateTokenAsync(user, _configuration);

            var refreshToken = _userService.GenerateRefreshToken();
            _userService.SetRefreshToken(refreshToken, user, HttpContext, _usersRepository);

            return Ok(new { token, refreshToken });
        }

        [HttpPost("login/name")] 
        public async Task<ActionResult<string>> LoginWithName(LoginRequest loginUser)
        {
            User user = await _usersRepository.GetUserByNameAsync(loginUser.UserName);

            if (user == null)
                return BadRequest("Wrong name");

            var result = _signInManager.CheckPasswordSignInAsync(user, loginUser.Password, false);

            if (!result.Result.Succeeded)
                return BadRequest("Wrong password");

            var token = await _userService.CreateTokenAsync(user, _configuration);

            var refreshToken = _userService.GenerateRefreshToken();
            _userService.SetRefreshToken(refreshToken, user, HttpContext, _usersRepository);

            return Ok(new {token, refreshToken});
        }

        [HttpPost("refresh-token")] 
        public async Task<ActionResult<string>> RefreshToken(RefreshTokenRequest tokenRequest)
        {
            var user = await _usersRepository.GetUserAsync(tokenRequest.UserId);

            if(user == null)
            {
                return NotFound("Log in first");
            } 
            else if(!user.RefreshToken.Equals(tokenRequest.RefreshToken))
            {
                return BadRequest("Invalid Refresh Token.");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return BadRequest("Token expired.");
            }

            string token = await _userService.CreateTokenAsync(user, _configuration);
            var refreshToken = _userService.GenerateRefreshToken();
            _userService.SetRefreshToken(refreshToken, user, HttpContext, _usersRepository);

            return Ok(new { token, refreshToken});
        }
        
    }
}
