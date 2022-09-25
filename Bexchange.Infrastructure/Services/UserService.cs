using Bexchange.Infrastructure.Repositories.Interfaces;
using Bexchange.Infrastructure.Services.Repositories;
using BexchangeAPI.Domain.DtoModels;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

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
        public void SetRefreshToken(RefreshToken token, User user, HttpContext context, IUsersRepository<User> _usersRepository)
        {
            var cookieOpts = new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly = true,
                Expires = token.Expires,
                IsEssential = true,
                Secure = true,
            };

            context.Response.Cookies.Append("refreshToken", token.Token, cookieOpts);

            context.Response.Headers.Add("token", token.Token);
            context.Response.Headers.Add("tokenExp", token.Expires.ToString());

            user.RefreshToken = token.Token;
            user.TokenCreated = token.CreateTime;
            user.TokenExpires = token.Expires;

            _usersRepository.SaveUser();
        }
        public string CreateToken(User user, IConfiguration _configuration)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        public async Task<bool> TestUserSearchAsync(UserRequest user, IUsersRepository<User> _usersRepository)
        {
            var testSearchUser = await _usersRepository.GetUserByNameAsync(user.UserName);
            if (testSearchUser != null)
                return true;

            testSearchUser = await _usersRepository.GetUserByEmailAsync(user.Email);
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
