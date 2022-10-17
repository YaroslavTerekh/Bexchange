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
        public Task<IEnumerable<T>> GetAllVerifiedBooksAsync(int userId, CancellationToken token);
        public Task<Genre> GetGenreAsync(int id, CancellationToken token);
        public Task<int> AddImageAsync(HttpContext context, string path, IUserService service, string rootPath, CancellationToken token);
        public Task<Image> GetImageAsync(int id, CancellationToken token);
        public Task DeleteImageAsync(int id, CancellationToken token);
        public Task<IEnumerable<T>> GetFirstBooksAsync(int amount, CancellationToken token);
        public Task AddCommentAsync(Comment comment, int id, User user, CancellationToken token);
        public Task AddGenreAsync(Genre genre, CancellationToken token);
        public Task<IEnumerable<Genre>> GetGenresAsync(CancellationToken token);
        public Task<IEnumerable<T>> GetByGenreAsync(string genre, CancellationToken token);
        public Task DeleteGenreAsync(int id, CancellationToken token);
        public Task<IEnumerable<Author>> GetAuthorsAsync(CancellationToken token);
        public Task<IEnumerable<Author>> GetAllAuthorsAsync(CancellationToken token);
        public Task<IEnumerable<T>> GetByAuthorAsync(string author, CancellationToken token);
        public Task<Author> GetAuthorAsync(int id, CancellationToken token);
        public Task<Author> GetAuthorByNameAsync(string name, CancellationToken token);
        public Task ModifyAuthorAsync(Author author, CancellationToken token);
        public Task<IEnumerable<T>> IgnoreUserBooksAsync(int userId, CancellationToken token);
        public Task<IEnumerable<T>> SearchBooksAsync(string title, CancellationToken token);
    }
}
