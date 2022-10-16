using Bexchange.Domain.RequestModels;
using BexchangeAPI.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Repositories.Interfaces
{
    public interface IUsersRepository<T>
    {
        public Task<object> GetLastUsersAsync();
        public Task<IEnumerable<T>> GetAdminsOnlyAsync();
        public Task<IEnumerable<T>> GetAllUsersAsync();
        public Task<T> GetUserAsync(int id);
        public Task<T> GetUserByNameAsync(string name);
        public Task<T> GetUserByEmailAsync(string email);
        public Task BanUserAsync(int id);
        public Task UnbanUserAsync(int id);
        public Task ModifyUserAsync(ChangeUserInfoRequest user);
        public Task ChangeRoleAsync(Roles role, int id);
        public Task SaveUser();
    }
}
