using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Repositories.Interfaces
{
    public interface IOrderContentRepository<T> : IContentRepository<T>
    {
        public Task AcceptOrderAsync(int id);
        public Task DeclineOrderAsync(int id);
    }
}
