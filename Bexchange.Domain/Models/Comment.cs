using BexchangeAPI.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Domain.Models
{
    public class Comment : BaseModel
    {
        public User Author { get; set; }
        public string Message { get; set; }
    }
}
