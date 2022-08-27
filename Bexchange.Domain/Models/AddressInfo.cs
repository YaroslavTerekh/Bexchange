using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Domain.Models
{
    public class AddressInfo
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required(ErrorMessage = "'Country' field is empty")]
        public string Country { get; set; }
        [Required(ErrorMessage = "'City' field is empty")]
        public string City { get; set; }
        [Required(ErrorMessage = "'Post index' field is empty")]
        public string PostIndex { get; set; }
    }
}
