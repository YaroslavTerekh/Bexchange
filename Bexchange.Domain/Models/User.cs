using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading.Tasks;
using Bexchange.Domain.Enum;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bexchange.Domain.Models
{
    public class User
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required(ErrorMessage = "Enter your nickname")]
        [MaxLength(15, ErrorMessage = "Too many chars")]
        public string Nickname { get; set; }        
        [Required(ErrorMessage = "Enter your fullname")]
        [MaxLength(20, ErrorMessage = "Too many chars")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Enter your e-mail")]
        public string Email { get; set; }
        [ForeignKey(nameof(AddressInfo))]
        public int AddressId { get; set; }
        [Required]
        public AddressInfo Address { get; set; }
        public ICollection<Book>? Books { get; set; }
        public DateTime RegisteredDate { get; set; } = DateTime.Now;
        [Required]
        public string Password { get; set; }
        public Roles Role { get; set; }

        public bool IsBanned { get; set; } = false;
    }
}
