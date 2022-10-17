using Bexchange.Infrastructure.Repositories.Interfaces;
using Bexchange.Infrastructure.Services.Repositories;
using BexchangeAPI.Domain.Enum;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.DtbContext;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Infrastructure.Repositories
{
    public class OrdersRepository : IOrderContentRepository<ExchangeOrder>
    {
        private readonly ContentDbContext _context;
        public OrdersRepository(ContentDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExchangeOrder>> GetAllComponentsAsync(CancellationToken token = default)
        {
            return await _context.Orders
                .Include(o => o.FirstBook).ThenInclude(b => b.Image)
                .Include(o => o.SecondBook).ThenInclude(b => b.Image)
                .ToListAsync(token);
        }

        public async Task AddComponentAsync(ExchangeOrder order, CancellationToken token = default)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task<ExchangeOrder?> GetComponentAsync(int id, CancellationToken token = default)
        {
            return await _context.Orders
                .Where(o => o.Id == id)
                .Include(o => o.FirstBook).ThenInclude(b => b.Image)
                .Include(o => o.SecondBook).ThenInclude(b => b.Image)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteComponentAsync(int id, CancellationToken token = default)
        {
            _context.Orders.Remove(await GetComponentAsync(id));
            await _context.SaveChangesAsync();
        }

        public async Task ModifyComponentStateAsync(int id, State state, CancellationToken token = default)
        {
            ExchangeOrder order = await GetComponentAsync(id);
            order.State = state;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ExchangeOrder>> GetUserComponentsAsync(int id, CancellationToken token = default)
        {
            return await _context.Orders
                .Where(o => o.FirstBook.UserId == id || o.SecondBook.UserId == id)
                .Include(o => o.FirstBook)
                .Include(b => b.SecondBook)
                .ToListAsync();
        }

        public async Task AcceptOrderAsync(int id, CancellationToken token = default)
        {
            var order = await GetComponentAsync(id);
            order.State = State.Verified;
            await _context.SaveChangesAsync();
        }

        public async Task SuccessOrderAsync(int id, IUserService userService, HttpContext context, CancellationToken token = default)
        {
            ExchangeOrder order = await GetComponentAsync(id);
            int userId = userService.GetUserId(context);

            if (order.FirstBook.UserId == userId)
                order.FirstUserAccepted = true;

            if (order.SecondBook.UserId == userId)
                order.SecondUserAccepted = true;

            await _context.SaveChangesAsync();
        }

        public async Task DeclineOrderAsync(int id, CancellationToken token = default)
        {
            var order = await GetComponentAsync(id);
            order.State = State.Cancelled;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ExchangeOrder>> GetUserOutgoingOrdersAsync(IUserService userService, HttpContext context, CancellationToken token = default)
        {
            return await _context.Orders
                .Where(o => o.SecondBook.UserId == userService.GetUserId(context) && o.State == State.Verified)
                .Include(b => b.FirstBook)
                .Include(b => b.SecondBook)
                .ToListAsync();
        }

        public async Task<IEnumerable<ExchangeOrder>> GetUserIncomingOrdersAsync(IUserService userService, HttpContext context, CancellationToken token = default)
        {
            return await _context.Orders
                .Where(o => o.FirstBook.UserId == userService.GetUserId(context))
                .Include(b => b.FirstBook)
                .Include(b => b.SecondBook)
                .ToListAsync();
        }

        public async Task<IEnumerable<ExchangeOrder>> GetUserSuceededOrdersAsync(IUserService userService, HttpContext context, CancellationToken token = default)
        {
            int userId = userService.GetUserId(context);

            return await _context.Orders
                .Where(b => (b.FirstBook.UserId == userId || b.SecondBook.UserId == userId) && (b.FirstUserAccepted == true && b.SecondUserAccepted == true))
                .Include(b => b.FirstBook)
                .Include(b => b.SecondBook)
                .ToListAsync();
        }
    }
}
