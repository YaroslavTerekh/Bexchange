using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Infrastructure.Repositories.Interfaces
{
    public interface IContentRepository<T>
    {
        public Task<IEnumerable<T>> GetAllComponentsAsync();
        public Task AddComponentAsync(T order);
        public Task<T> GetComponentAsync(int id);
        public Task DeleteComponentAsync(int id);
        public Task ModifyComponentAsync(T order);
    }
}
