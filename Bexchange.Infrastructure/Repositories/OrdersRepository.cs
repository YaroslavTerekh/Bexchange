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

        public async Task<IEnumerable<ExchangeOrder>> GetAllComponents()
        {
            return await _context.Orders
                .Include(o => o.FirstBook).ThenInclude(b => b.Image)
                .Include(o => o.SecondBook).ThenInclude(b => b.Image)
                .ToListAsync();
        }

        public async Task AddComponent(ExchangeOrder order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task<ExchangeOrder?> GetComponent(int id)
        {
            return await _context.Orders
                .Where(o => o.Id == id)
                .Include(o => o.FirstBook).ThenInclude(b => b.Image)
                .Include(o => o.SecondBook).ThenInclude(b => b.Image)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteComponent(int id)
        {
            _context.Orders.Remove(await GetComponent(id));
            await _context.SaveChangesAsync();
        }

        public async Task ModifyComponent(ExchangeOrder order)
        {
            ExchangeOrder originalOrder = await GetComponent(order.Id);

            originalOrder.FirstBook = order.FirstBook;
            originalOrder.SecondBook = order.SecondBook;

            await _context.SaveChangesAsync();
        }
    }
}
