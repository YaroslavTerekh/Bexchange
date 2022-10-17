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
        public Task<object> GetLastUsersAsync(CancellationToken token = default);
        public Task<IEnumerable<T>> GetAdminsOnlyAsync(CancellationToken token);
        public Task<IEnumerable<T>> GetAllUsersAsync(CancellationToken token);
        public Task<T> GetUserAsync(int id, CancellationToken token);
        public Task<T> GetUserByNameAsync(string name, CancellationToken token);
        public Task<T> GetUserByEmailAsync(string email, CancellationToken token);
        public Task BanUserAsync(int id, CancellationToken token);
        public Task UnbanUserAsync(int id, CancellationToken token);
        public Task ModifyUserAsync(ChangeUserInfoRequest user, CancellationToken token);
        public Task ChangeRoleAsync(Roles role, int id, CancellationToken token);
        public Task SaveUser(CancellationToken token);
    }
}
