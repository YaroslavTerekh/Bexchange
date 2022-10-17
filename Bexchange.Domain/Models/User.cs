using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading.Tasks;
using BexchangeAPI.Domain.Enum;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;

namespace BexchangeAPI.Domain.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int AddressId { get; set; }
        public AddressInfo Address { get; set; }
        public ICollection<Book>? Books { get; set; }
        public DateTime RegisteredDate { get; set; } = DateTime.UtcNow;     
        public Roles Role { get; set; }

        public string? RefreshToken { get; set; }
        public DateTime? TokenCreated { get; set; } 
        public DateTime? TokenExpires { get; set; }

        public bool IsBanned { get; set; }
    }
}
