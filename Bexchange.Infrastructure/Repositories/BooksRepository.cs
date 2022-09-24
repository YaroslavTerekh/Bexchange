﻿using Bexchange.Domain.Models;
using Bexchange.Infrastructure.Repositories.Interfaces;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.DtbContext;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
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

        public async Task<IEnumerable<Book>> GetAllComponentsAsync()
        {
            return await _context.Books
                .Include(b => b.Image)
                .Include(b => b.Author)
                .Include(b => b.Genre)
                .Include(b => b.User)
                    .ThenInclude(u => u.Address)
                .Include(b => b.User)
                    .ThenInclude(u => u.Books)
                .ToListAsync();
        }

        public async Task AddComponentAsync(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
        }

        public async Task<Book?> GetComponentAsync(int id)
        {
            return await _context.Books.Where(b => b.Id == id)
                .Include(b => b.Image)
                .Include(b => b.Author)
                .Include(b => b.Genre)
                .Include(b => b.User)
                    .ThenInclude(u => u.Address)
                .Include(b => b.User)
                    .ThenInclude(u => u.Books)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteComponentAsync(int id)
        {
            _context.Books.Remove(await GetComponentAsync(id));
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
            Book book = await GetComponentAsync(id);
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
                .ToListAsync();
        }

        public async Task<IEnumerable<Genre>> GetGenresAsync()
        {
            return await _context.Genres.ToListAsync();
        }

        public async Task<IEnumerable<Author>> GetAuthorsAsync()
        {
            return await _context.Authors.ToListAsync();
        }
    }
}
