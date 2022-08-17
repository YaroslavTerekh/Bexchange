using Bexchange.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Repositories.Interfaces
{
    public interface IOrdersRepository
    {
        public Task<IEnumerable<ExchangeOrder>> GetAllOrders();
        public Task AddOrder(ExchangeOrder order);
        public Task<ExchangeOrder> GetOrder(int id);
        public Task DeleteOrder(int id);
        public Task ModifyOrder(ExchangeOrder order);
    }
}
