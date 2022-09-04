using Bexchange.Infrastructure.Repositories.Interfaces;
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

        public async Task BanUserAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            user.IsBanned = true;
            _context.SaveChanges();
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetUserByNameAsync(string name)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.NickName == name);
        }

        public async Task ModifyUserAsync(User user)
        {
            var _user = await GetUserAsync(user.Id);

            _user.NickName = user.NickName;
            _user.FirstName = user.FirstName;
            _user.LastName = user.LastName;
            _user.Email = user.Email;
            _user.Address = new AddressInfo
            {
                Country = user.Address.Country,
                City = user.Address.City,
                PostIndex = user.Address.PostIndex,
            };
            _user.Role = user.Role;

            await _context.SaveChangesAsync();
        }

        public async Task RegisterUserAsync(User user)
        {
            await _context.Users.AddAsync(user);

            await _context.SaveChangesAsync();
        }
    }
}
