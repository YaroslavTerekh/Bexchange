using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bexchange.Domain.Models;
using BexchangeAPI.Domain.Enum;

namespace BexchangeAPI.Domain.Models
{
    public class ExchangeOrder : BaseDTO
    {
        public new Book FirstBook { get; set; }
        public new Book SecondBook { get; set; }
        [ForeignKey(nameof(FirstBook))]
        public int FirstBookId { get; set; }
        [ForeignKey(nameof(SecondBook))]
        public int SecondBookId { get; set; }

        public State State { get; set; }
    }
}
