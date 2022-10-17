using Bexchange.Infrastructure.Repositories.Interfaces;
using Bexchange.Infrastructure.Services.Repositories;
using BexchangeAPI.Domain.DtoModels;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Bexchange.Infrastructure.Services
{
    public class UserService : IUserService
    {
        public int GetUserId(HttpContext context)
        {
            var identity = context.User.Identity as ClaimsIdentity;
            var id = identity.FindFirst("id").Value;
            return Int32.Parse(id);
        }
        public bool IsAdmin(HttpContext context)
        {
            var identity = context.User.Identity as ClaimsIdentity;
            var role = identity.FindFirst(ClaimTypes.Role).Value;

            return role == Roles.Admin.ToString() | role == Roles.SuperAdmin.ToString() ? true : false;
        }
        public RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                CreateTime = DateTime.Now
            };

            return refreshToken;
        }
        public void SetRefreshToken(RefreshToken refreshToken, User user, HttpContext context, IUsersRepository<User> _usersRepository, CancellationToken token = default)
        {
            var cookieOpts = new CookieOptions
            {
                HttpOnly = true,
                Expires = refreshToken.Expires,
                IsEssential = true,
                Secure = true,
            };

            context.Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOpts);

            context.Response.Headers.Add("token", refreshToken.Token);
            context.Response.Headers.Add("tokenExp", refreshToken.Expires.ToString());

            user.RefreshToken = refreshToken.Token;
            user.TokenCreated = refreshToken.CreateTime;
            user.TokenExpires = refreshToken.Expires;

            _usersRepository.SaveUser(token);
        }
        public async Task<bool> TestUserSearchAsync(UserRequest user, IUsersRepository<User> _usersRepository, CancellationToken token = default)
        {
            var testSearchUser = await _usersRepository.GetUserByNameAsync(user.UserName, token);
            if (testSearchUser != null)
                return true;

            testSearchUser = await _usersRepository.GetUserByEmailAsync(user.Email, token);
            if (testSearchUser != null)
                return true;

            return false;
        }
        public async Task<string> CreateTokenAsync(User user, IConfiguration _configuration)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(type: "Id", value: user.Id.ToString()),
                new Claim(type: "AddressId", value: user.AddressId.ToString()),
                new Claim(type: "Name", user.FirstName),
                new Claim(type: "Surname", user.LastName),
                new Claim(type: "Email", user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
                new Claim(type: "Role", user.Role.ToString())   
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt.ToString();
        }
    }
}
