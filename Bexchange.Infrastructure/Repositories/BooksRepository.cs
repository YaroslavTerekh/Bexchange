using Bexchange.Domain.Models;
using Bexchange.Infrastructure.Repositories.Interfaces;
using Bexchange.Infrastructure.Services.Repositories;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.DtbContext;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Grpc.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Infrastructure.Repositories
{
    public class BooksRepository : IBookContentRepository<Book>
    {
        private readonly ContentDbContext _context;
        public BooksRepository(ContentDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetFirstBooksAsync(int amount)
        {
            return await _context.Books
                .Include(b => b.Image)
                .OrderByDescending(b => b.Id)
                .Take(amount)
                .ToListAsync();
        }

        public async Task<IEnumerable<Book>> GetAllComponentsAsync(CancellationToken token = default)
        {
            return await _context.Books
                .Include(b => b.Image)
                .Include(b => b.Author)
                .Include(b => b.Genre)
                .Include(b => b.User)
                    .ThenInclude(u => u.Address)
                .Include(b => b.User)
                    .ThenInclude(u => u.Books)
                .Include(b => b.Comments)
                    .ThenInclude(c => c.Author)
                .ToListAsync(token);
        }

        public async Task AddComponentAsync(Book book)
        {
            book.Image = await GetImageAsync(book.ImageId);
            book.Author = new Author
            {
                Name = book.Author.Name,
                WikiLink = "",
                ImgPath = ""
            };

            book.Genre = await GetGenreAsync(book.GenreId);

            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
        }

        public async Task<Book?> GetComponentAsync(int id)
        {
            return await _context.Books.Where(b => b.Id == id && b.State == State.Verified)
                .Include(b => b.Image)
                .Include(b => b.Author)
                .Include(b => b.Genre)
                .Include(b => b.User)
                    .ThenInclude(u => u.Address)
                .Include(b => b.User)
                    .ThenInclude(u => u.Books)
                .Include(b => b.Comments)
                    .ThenInclude(c => c.Author)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteComponentAsync(int id)
        {
            var book = await GetComponentAsync(id);

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
        }

        public async Task ModifyComponentAsync(Book book)
        {
            Book originalBook = await GetComponentAsync(book.Id);

            originalBook.Title = book.Title;
            originalBook.Description = book.Description;
            originalBook.Image.Path = book.Image.Path;
            originalBook.Image.Date = book.Image.Date;

            await _context.SaveChangesAsync();
        }

        public async Task ModifyComponentStateAsync(int id, State state)
        {
            Book book = await _context.Books.Where(b => b.Id == id).FirstOrDefaultAsync();

            book.State = state;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Book>> GetUserComponentsAsync(int userId)
        {
            return await _context.Books
                .Where(b => b.UserId == userId)
                .Include(b => b.Image)
                .Include(b => b.Author)
                .Include(b => b.Genre)
                .Include(b => b.User)
                .Include(b => b.Comments)
                    .ThenInclude(c => c.Author)
                .ToListAsync();
        }

        public async Task AddCommentAsync(Comment comment, int id, User user)
        {
            Book book = await GetComponentAsync(id);
            comment.Author = user;
            book.Comments?.Add(comment);

            await _context.SaveChangesAsync();
        }

        public async Task<Genre> GetGenreAsync(int id)
        {
            return await _context.Genres.Where(g => g.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Genre>> GetGenresAsync()
        {
            return await _context.Genres.ToListAsync();
        }

        public async Task<IEnumerable<Author>> GetAuthorsAsync()
        {
            return await _context.Authors.ToListAsync();
        }

        public async Task<IEnumerable<Book>> IgnoreUserBooksAsync(int userId)
        {
            return await _context.Books
                .Where(b => b.UserId != userId)
                .Include(b => b.Image)
                .Include(b => b.Author)
                .Include(b => b.Genre)
                .Include(b => b.User)
                .Include(b => b.Comments)
                    .ThenInclude(c => c.Author)
                .ToListAsync();
        }

        public async Task AddGenreAsync(Genre genre)
        {
            await _context.Genres.AddAsync(genre);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Book>> GetByGenreAsync(string genre)
        {
            return await _context.Books
                .Where(b => b.Genre.Title == genre)
                .Include(b => b.Image)
                .Include(b => b.Author)
                .Include(b => b.Genre)
                .Include(b => b.User)
                .Include(b => b.Comments)
                    .ThenInclude(c => c.Author)
                .ToListAsync();
        }

        public async Task<IEnumerable<Book>> GetByAuthorAsync(string author)
        {
            return await _context.Books
                .Where(b => b.Author.Name == author)
                .Include(b => b.Image)
                .Include(b => b.Author)
                .Include(b => b.Genre)
                .Include(b => b.User)
                .Include(b => b.Comments)
                    .ThenInclude(c => c.Author)
                .ToListAsync();
        }

        public async Task ModifyAuthorAsync(Author author)
        {
            Author entity = await _context.Authors.Where(a => a.Id == author.Id).FirstOrDefaultAsync();

            entity.Name = author.Name;
            entity.ImgPath = author.ImgPath;
            entity.WikiLink = author.WikiLink;

            await _context.SaveChangesAsync();
        }

        public async Task<int> AddImageAsync(HttpContext context, string path, IUserService service, string rootPath)
        {
            var file = context.Request.Form.Files[0];

            if (file != null && file.ContentDisposition.Length > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var filePathName = DateTime.Now.Millisecond + service.GetUserId(context) + fileName;
                var uploadPath = Path.Combine("",path + @"\uploads\images\" + filePathName);
                var filePath = Path.Combine("", path + @"\uploads\images\" + filePathName);

                using (FileStream stream = new FileStream(uploadPath, FileMode.CreateNew))
                {
                    await file.CopyToAsync(stream);
                }

                var image = new Image
                {
                    Id = 0,
                    Path = filePath,
                    Date = DateTime.UtcNow
                };

                var res = await _context.Images.AddAsync(image);
                await _context.SaveChangesAsync();

                return res.Entity.Id;
            }

            return 0;
        }

        public async Task<Image> GetImageAsync(int id)
        {
            return await _context.Images.Where(i => i.Id == id).FirstOrDefaultAsync();
        }

        public async Task DeleteImageAsync(int id)
        {
            var image = await GetImageAsync(id);
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            File.Delete(image.Path);
        }

        public async Task DeleteGenreAsync(int id)
        {
            var genre = await GetGenreAsync(id);

            _context.Genres.Remove(genre);
            await _context.SaveChangesAsync();
        }
    }
}
