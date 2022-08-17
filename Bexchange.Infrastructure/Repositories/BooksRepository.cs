using Bexchange.Domain.Models;
using Bexchange.Infrastructure.DtbContext;
using Bexchange.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Repositories
{
    public class BooksRepository : IBooksRepository
    {
        private readonly ContentDbContext _context;
        public BooksRepository(ContentDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return await _context.Books
                .Include(b => b.Image)
                .Include(b => b.User)
                .ThenInclude(o => o.Address)
                .ToListAsync();
        }

        public async Task AddBook(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
        }

        public async Task<Book?> GetBook(int id)
        {
            return await _context.Books.Where(b => b.Id == id)
                .Include(b => b.Image)
                .Include(b => b.User)
                .ThenInclude(o => o.Address)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteBook(int id)
        {
            _context.Books.Remove(await GetBook(id));
            await _context.SaveChangesAsync();
        }

        public async Task ModifyBook(Book book)
        {
            Book originalBook = await GetBook(book.Id);

            originalBook.Title = book.Title;
            originalBook.Description = book.Description;
            originalBook.Image = book.Image;

            await _context.SaveChangesAsync();
        }
    }
}
