using Bexchange.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Domain.DtoModels;
using BexchangeAPI.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Services.Repositories
{
    public interface IUserService
    {
        public int GetUserId(HttpContext context);
        public bool IsAdmin(HttpContext context);
        public RefreshToken GenerateRefreshToken();
        public void SetRefreshToken(RefreshToken token, User user, HttpContext context, IUsersRepository<User> _usersRepository);
        public string CreateToken(User user, IConfiguration _configuration);
        public Task<bool> TestUserSearchAsync(UserRequest user, IUsersRepository<User> _usersRepository);
        public Task<string> CreateTokenAsync(User user, IConfiguration _configuration);
    }
}
