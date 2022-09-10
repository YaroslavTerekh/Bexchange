using Bexchange.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Domain.Models
{
    public class AddressInfo : BaseDTO
    {
        public string Country { get; set; }
        public string City { get; set; }
        public string PostIndex { get; set; }
    }
}
