using Bexchange.Domain.Models;
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
        public Task<IEnumerable<T>> GetUserComponentsAsync(int userId);
        public Task AddComponentAsync(T component);
        public Task<T> GetComponentAsync(int id);
        public Task DeleteComponentAsync(int id);
        public Task ModifyComponentAsync(T component);
        public Task ModifyComponentStateAsync(int id, State state);
        
    }
}
