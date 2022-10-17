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
        public string UserName { get; set; }        
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public AddressInfo Address { get; set; }
    }
}
