using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Domain.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
