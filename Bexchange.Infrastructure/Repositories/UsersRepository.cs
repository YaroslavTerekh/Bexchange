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

        public async Task ChangeRoleAsync(Roles role, int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            user.Role = role;
            _context.SaveChanges();
        }

        public async Task BanUserAsync(int id)
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

        public async Task<IEnumerable<User>> GetAdminsOnlyAsync()
        {
            return await _context.Users.Where(u => u.Role == Roles.Admin).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users
                .Include(u => u.Address)
                .Include(u => u.Books)
                    .ThenInclude(b => b.Image)
                .ToListAsync();
        }

        public async Task<User> GetUserAsync(int id)
        {
            return await _context.Users
                .Where(u => u.Id == id)
                .Include(u => u.Address)
                .Include(u => u.Books)
                    .ThenInclude(b => b.Image)
                .FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.Where(u => u.Email == email)
                .Include(u => u.Address)
                .Include(u => u.Books)
                    .ThenInclude(b => b.Image)
                .FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByNameAsync(string name)
        {
            return await _context.Users.Where(u => u.UserName == name)
                .Include(u => u.Address)
                .Include(u => u.Books)
                    .ThenInclude(b => b.Image)
                .FirstOrDefaultAsync(); ;
        }

        public async Task ModifyUserAsync(User user)
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
            _user.Role = user.Role;

            await _context.SaveChangesAsync();
        }

        public async Task RegisterUserAsync(User user)
        {
            await _context.Users.AddAsync(user);

            await _context.SaveChangesAsync();
        }

        public async Task SaveUser()
        {
            await _context.SaveChangesAsync();
        }
    }
}
