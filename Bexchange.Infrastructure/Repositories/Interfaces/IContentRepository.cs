using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Infrastructure.Repositories.Interfaces
{
    public interface IContentRepository<T>
    {
        public Task<IEnumerable<T>> GetAllComponents();
        public Task AddComponent(T order);
        public Task<T> GetComponent(int id);
        public Task DeleteComponent(int id);
        public Task ModifyComponent(T order);
    }
}
