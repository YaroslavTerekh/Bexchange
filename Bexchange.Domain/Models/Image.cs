using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Domain.Models
{
    public class Image
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string Path { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
