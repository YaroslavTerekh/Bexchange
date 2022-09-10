using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bexchange.Domain.Models;
using BexchangeAPI.Domain.Annotations;
using BexchangeAPI.Domain.Enum;

namespace BexchangeAPI.Domain.Models
{
    public class Book : BaseDTO
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        [ForeignKey(nameof(Image))]
        public int ImageId { get; set; }
        public Image Image { get; set; }
        public virtual int UserId { get; set; }
        public User User { get; set; }

        public State State { get; set; }
    }
}
