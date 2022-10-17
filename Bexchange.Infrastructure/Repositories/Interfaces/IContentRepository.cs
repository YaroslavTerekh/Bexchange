using Bexchange.Domain.Models;
using Bexchange.Infrastructure.Services.Repositories;
using BexchangeAPI.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Infrastructure.Repositories.Interfaces
{
    public interface IContentRepository<T>
    {
        public Task<IEnumerable<T>> GetAllComponentsAsync(CancellationToken token);
        public Task<IEnumerable<T>> GetUserComponentsAsync(int userId, CancellationToken token);
        public Task AddComponentAsync(T component, CancellationToken token);
        public Task<T> GetComponentAsync(int id, CancellationToken token);
        public Task DeleteComponentAsync(int id, CancellationToken token);
        public Task ModifyComponentStateAsync(int id, State state, CancellationToken token);
        
    }
}
