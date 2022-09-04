namespace Bexchange.Jwt.API.Models.DtoModels
{
    public class UserDTO
    {
        public string NickName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public AddressInfoDTO AddressInfo { get; set; }
        public string Password { get; set; }
    }
}
