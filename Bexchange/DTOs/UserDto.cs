using System.ComponentModel.DataAnnotations;

namespace Bexchange.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Enter your nickname")]
        [MaxLength(15, ErrorMessage = "Too many chars")]
        public string NickName { get; set; }
        [Required(ErrorMessage = "Enter your fullname")]
        [MaxLength(20, ErrorMessage = "Too many chars")]
        public string FullName { get; set; }
        public AddressInfoDto Address { get; set; }
        public ICollection<BookDto>? Books { get; set; }
    }
}
