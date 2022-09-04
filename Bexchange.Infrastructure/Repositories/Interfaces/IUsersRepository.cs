using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Repositories.Interfaces
{
    public interface IUsersRepository<T>
    {
        public Task<IEnumerable<T>> GetAllUsersAsync();
        public Task RegisterUserAsync(T user);
        public Task<T> GetUserAsync(int id);
        public Task<T> GetUserByNameAsync(string name);
        public Task<T> GetUserByEmailAsync(string email);
        public Task BanUserAsync(int id);
        public Task ModifyUserAsync(T user);
    }
}
