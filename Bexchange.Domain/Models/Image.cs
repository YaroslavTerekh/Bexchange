using Bexchange.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Domain.Models
{
    public class Image : BaseModel
    {
        public string Path { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
