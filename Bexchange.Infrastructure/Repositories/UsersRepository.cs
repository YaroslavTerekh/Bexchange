﻿using Bexchange.Domain.RequestModels;
using Bexchange.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Domain.CustomExceptions;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.DtbContext;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Infrastructure.Repositories
{
    public class UsersRepository : IUsersRepository<User>
    {
        private readonly ContentDbContext _context;
        public UsersRepository(ContentDbContext context)
        {
            _context = context;
        }

        public async Task ChangeRoleAsync(Roles role, int id, CancellationToken token = default)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            user.Role = role;
            _context.SaveChanges();
        }

        public async Task BanUserAsync(int id, CancellationToken token = default)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if(user.Role == Roles.User)
            {
                user.IsBanned = true;
                _context.SaveChanges();
            } else
            {
                throw new Exception("This user is an admin");
            }
        }

        public async Task UnbanUserAsync(int id, CancellationToken token = default)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            user.IsBanned = false;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAdminsOnlyAsync(CancellationToken token = default)
        {
            return await _context.Users.Where(u => u.Role == Roles.Admin).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync(CancellationToken token = default)
        {
            return await _context.Users
                .Include(u => u.Address)
                .Include(u => u.Books)
                    .ThenInclude(b => b.Image)
                .ToListAsync();
        }

        public async Task<User> GetUserAsync(int id, CancellationToken token = default)
        {
            return await _context.Users
                .Where(u => u.Id == id)
                .Include(u => u.Address)
                .Include(u => u.Books)
                    .ThenInclude(b => b.Image)
                .FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByEmailAsync(string email, CancellationToken token = default)
        {
            return await _context.Users.Where(u => u.Email == email)
                .Include(u => u.Address)
                .Include(u => u.Books)
                    .ThenInclude(b => b.Image)
                .FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByNameAsync(string name, CancellationToken token = default)
        {
            return await _context.Users.Where(u => u.UserName == name)
                .Include(u => u.Address)
                .Include(u => u.Books)
                    .ThenInclude(b => b.Image)
                .FirstOrDefaultAsync(); ;
        }

        public async Task ModifyUserAsync(ChangeUserInfoRequest user, CancellationToken token = default)
        {
            var _user = await GetUserAsync(user.Id);

            _user.UserName = user.UserName;
            _user.FirstName = user.FirstName;
            _user.LastName = user.LastName;
            _user.Email = user.Email;
            _user.Address = new AddressInfo
            {
                Country = user.Address.Country,
                City = user.Address.City,
                PostIndex = user.Address.PostIndex,
            };

            await _context.SaveChangesAsync();
        }

        public async Task SaveUser(CancellationToken token = default)
        {
            await _context.SaveChangesAsync();
        }

        public async Task<object> GetLastUsersAsync(CancellationToken token = default)
        {
            var users = await GetAllUsersAsync();
            var last7DaysUsers = users.Where(u => u.RegisteredDate > DateTime.UtcNow.AddDays(-7));

            var result = new {
                day7 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.Day),
                day6 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-1).Day),
                day5 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-2).Day),
                day4 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-3).Day),
                day3 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-4).Day),
                day2 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-5).Day),
                day1 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-6).Day),
            };
            
            return result;
        }
    }
}
