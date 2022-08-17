using Bexchange.Domain.Models;
using Bexchange.Infrastructure.DtbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Repositories
{
    public class OrdersRepository
    {
        private readonly ContentDbContext _context;
        public OrdersRepository(ContentDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExchangeOrder>> GetAllOrders()
        {
            return await _context.Orders
                .Include(o => o.FirstBook).ThenInclude(b => b.Image)
                .Include(o => o.FirstBook).ThenInclude(b => b.User.Address)
                .Include(o => o.SecondBook).ThenInclude(b => b.Image)
                .Include(o => o.SecondBook).ThenInclude(b => b.User.Address)
                .ToListAsync();
        }

        public async Task AddOrder(ExchangeOrder order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task<ExchangeOrder?> GetOrder(int id)
        {
            return await _context.Orders
                .Where(o => o.Id == id)
                .Include(o => o.FirstBook).ThenInclude(b => b.Image)
                .Include(o => o.FirstBook).ThenInclude(b => b.User.Address)
                .Include(o => o.SecondBook).ThenInclude(b => b.Image)
                .Include(o => o.SecondBook).ThenInclude(b => b.User.Address).FirstOrDefaultAsync();
        }

        public async Task DeleteOrder(int id)
        {
            _context.Orders.Remove(await GetOrder(id));
            await _context.SaveChangesAsync();
        }

        public async Task ModifyOrder(ExchangeOrder order)
        {
            ExchangeOrder originalOrder = await GetOrder(order.Id);

            originalOrder.FirstBook = order.FirstBook;
            originalOrder.SecondBook = order.SecondBook;

            await _context.SaveChangesAsync();
        }
    }
}
