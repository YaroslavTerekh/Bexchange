using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading.Tasks;
using BexchangeAPI.Domain.Enum;
using System.ComponentModel.DataAnnotations.Schema;

namespace BexchangeAPI.Domain.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        [ForeignKey(nameof(AddressInfo))]
        public int AddressId { get; set; }
        public AddressInfo Address { get; set; }
        public ICollection<Book>? Books { get; set; }
        public DateTime RegisteredDate { get; set; } = DateTime.UtcNow;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }        
        public Roles Role { get; set; }

        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; } 
        public DateTime TokenExpires { get; set; }

        public bool IsBanned { get; set; } = false;
    }
}
