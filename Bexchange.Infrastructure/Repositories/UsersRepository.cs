using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.DtbContext;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
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

        public Task AddComponent(User order)
        {
            throw new NotImplementedException();
        }

        public Task DeleteComponent(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAllComponents()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetComponent(int id)
        {
            throw new NotImplementedException();
        }

        public Task ModifyComponent(User order)
        {
            throw new NotImplementedException();
        }
    }
}
