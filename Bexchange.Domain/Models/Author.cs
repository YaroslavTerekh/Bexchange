using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Domain.Models
{
    public class Author : BaseModel
    {
        public string Name { get; set; }
        public string? WikiLink { get; set; }
        public string? ImgPath { get; set; }
    }
}
