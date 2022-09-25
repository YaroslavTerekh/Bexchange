using BexchangeAPI.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Domain.RequestModels
{
    public class ChangeUserInfoRequest
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Enter your nickname")]
        [MaxLength(15, ErrorMessage = "Too many chars")]
        public string UserName { get; set; }        
        public string Email { get; set; }
        [Required(ErrorMessage = "Enter your first name")]
        [MaxLength(20, ErrorMessage = "Too many chars")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Enter your last name")]
        [MaxLength(20, ErrorMessage = "Too many chars")]
        public string LastName { get; set; }
        public AddressInfo Address { get; set; }
    }
}
