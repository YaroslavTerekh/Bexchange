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
    public class UsersRepository : IContentRepository<User>
    {
        private readonly ContentDbContext _context;
        public UsersRepository(ContentDbContext context)
        {
            _context = context;
        }

        public async Task AddComponent(User order)
        {
            await _context.Users.AddAsync(order);

            await _context.SaveChangesAsync();
        }

        public Task DeleteComponent(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAllComponents()
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetComponent(int id)
        {
            return await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
        }

        public Task ModifyComponent(User order)
        {
            throw new NotImplementedException();
        }
    }
}
