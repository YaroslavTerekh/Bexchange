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
        public int Id { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string PostIndex { get; set; }
    }
}
