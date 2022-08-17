using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading.Tasks;
using Bexchange.Domain.Enum;

namespace Bexchange.Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Enter your name!")]
        [MaxLength(15, ErrorMessage = "Too long name!")]
        public string Nickname { get; set; }
        [MaxLength(20, ErrorMessage = "Too long second name!")]
        [Required(ErrorMessage = "Enter your second name!")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Enter your e-mail!")]
        public string Email { get; set; }
        [Required]
        public AddressInfo Address { get; set; }
        public DateTime RegisteredDate { get; set; } = DateTime.Now;
        [Required]
        public string Password { get; set; }
        public Roles Role { get; set; }

        public bool IsBanned { get; set; } = false;
    }
}
