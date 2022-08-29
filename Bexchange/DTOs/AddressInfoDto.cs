using System.ComponentModel.DataAnnotations;

namespace Bexchange.DTOs
{
    public class AddressInfoDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "'Country' field is empty")]
        public string Country { get; set; }
        [Required(ErrorMessage = "'City' field is empty")]
        public string City { get; set; }
        [Required(ErrorMessage = "'Post index' field is empty")]
        public string PostIndex { get; set; }
    }
}
