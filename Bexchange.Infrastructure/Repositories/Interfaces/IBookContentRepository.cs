using Bexchange.Domain.Models;
using Bexchange.Infrastructure.Services.Repositories;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Repositories.Interfaces
{
    public interface IBookContentRepository<T> : IContentRepository<T>
    {
        public Task<Genre> GetGenreAsync(int id);
        public Task<int> AddImageAsync(HttpContext context, string path, IUserService service, string rootPath);
        public Task<Image> GetImageAsync(int id);
        public Task DeleteImageAsync(int id);
        public Task<IEnumerable<Book>> GetFirstBooksAsync(int amount);
        public Task AddCommentAsync(Comment comment, int id, User user);
        public Task AddGenreAsync(Genre genre);
        public Task<IEnumerable<Genre>> GetGenresAsync();
        public Task<IEnumerable<Book>> GetByGenreAsync(string genre);
        public Task<IEnumerable<Author>> GetAuthorsAsync();
        public Task<IEnumerable<Book>> GetByAuthorAsync(string author);
        public Task<IEnumerable<Book>> IgnoreUserBooksAsync(int userId);
    }
}
