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
        public string Nickname { get; set; }        
        public string FullName { get; set; }
        public string Email { get; set; }
        [ForeignKey(nameof(AddressInfo))]
        public int AddressId { get; set; }
        public AddressInfo Address { get; set; }
        public ICollection<Book>? Books { get; set; }
        public DateTime RegisteredDate { get; set; } = DateTime.Now;
        public string Password { get; set; }
        public Roles Role { get; set; }

        public bool IsBanned { get; set; } = false;
    }
}
