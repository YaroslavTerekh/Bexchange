using Bexchange.Domain.Models;
using BexchangeAPI.Domain.Models;
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
        public Task<IEnumerable<Book>> GetFirstBooksAsync(int amount);
        public Task AddCommentAsync(Comment comment, int id, User user);
        public Task<IEnumerable<Genre>> GetGenresAsync();
        public Task<IEnumerable<Book>> GetByGenreAsync(string genre);
        public Task<IEnumerable<Author>> GetAuthorsAsync();
        public Task<IEnumerable<Book>> GetByAuthorAsync(string author);
        public Task<IEnumerable<Book>> IgnoreUserBooksAsync(int userId);
    }
}
