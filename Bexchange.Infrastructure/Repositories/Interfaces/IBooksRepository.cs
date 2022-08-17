using Bexchange.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Repositories.Interfaces
{
    public interface IBooksRepository
    {
        public Task<IEnumerable<Book>> GetAllBooks();
        public Task AddBook(Book book);
        public Task<Book> GetBook(int id);
        public Task DeleteBook(int id);
        public Task ModifyBook(Book book);
    }
}
