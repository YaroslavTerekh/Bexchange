using Bexchange.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Repositories.Interfaces
{
    public interface IBookContentRepository<T> : IContentRepository<T>
    {
        public Task<IEnumerable<Genre>> GetGenresAsync();
        public Task<IEnumerable<Author>> GetAuthorsAsync();
    }
}
