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
    public class OrdersRepository : IContentRepository<ExchangeOrder>
    {
        private readonly ContentDbContext _context;
        public OrdersRepository(ContentDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExchangeOrder>> GetAllComponentsAsync()
        {
            return await _context.Orders
                .Include(o => o.FirstBook).ThenInclude(b => b.Image)
                .Include(o => o.SecondBook).ThenInclude(b => b.Image)
                .ToListAsync();
        }

        public async Task AddComponentAsync(ExchangeOrder order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task<ExchangeOrder?> GetComponentAsync(int id)
        {
            return await _context.Orders
                .Where(o => o.Id == id)
                .Include(o => o.FirstBook).ThenInclude(b => b.Image)
                .Include(o => o.SecondBook).ThenInclude(b => b.Image)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteComponentAsync(int id)
        {
            _context.Orders.Remove(await GetComponentAsync(id));
            await _context.SaveChangesAsync();
        }

        public async Task ModifyComponentAsync(ExchangeOrder order)
        {
            ExchangeOrder originalOrder = await GetComponentAsync(order.Id);

            originalOrder.FirstBook = order.FirstBook;
            originalOrder.SecondBook = order.SecondBook;

            await _context.SaveChangesAsync();
        }

        public async Task ModifyComponentStateAsync(int id, State state)
        {
            ExchangeOrder order = await GetComponentAsync(id);
            order.State = state;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ExchangeOrder>> GetUserComponentsAsync(int userId)
        {
            return await _context.Orders
                .Where(o => o.FirstBook.UserId == userId || o.SecondBook.UserId == userId).ToListAsync();
        }
    }
}
