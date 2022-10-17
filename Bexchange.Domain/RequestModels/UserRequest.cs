using BexchangeAPI.Domain.Models;

namespace BexchangeAPI.Domain.DtoModels
{
    public class UserRequest
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public AddressInfo AddressInfo { get; set; }
        public string Password { get; set; }
    }
}
