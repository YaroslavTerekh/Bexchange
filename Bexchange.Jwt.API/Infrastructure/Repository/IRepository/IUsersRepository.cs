using Bexchange.Jwt.API.Models;
using BexchangeAPI.Domain.Models;

namespace Bexchange.Jwt.API.Infrastructure.Repository.IRepository
{
    public interface IUsersRepository
    {
        public void AddUser(User user);
    }
}
