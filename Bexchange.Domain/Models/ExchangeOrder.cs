using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bexchange.Domain.Enum;

namespace Bexchange.Domain.Models
{
    public class ExchangeOrder
    {
        public int Id { get; set; }
        public Book FirstBook { get; set; }
        public Book SecondBook { get; set; }
        public int FirstBookId { get; set; }
        public int SecondBookId { get; set; }

        public State State { get; set; }
    }
}
