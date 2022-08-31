using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bexchange.Domain.Annotations;
using Bexchange.Domain.Enum;

namespace Bexchange.Domain.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        [ForeignKey(nameof(Image))]
        public int ImageId { get; set; }
        public Image Image { get; set; }
        public virtual int UserId { get; set; }
        public User User { get; set; }

        public State State { get; set; }
    }
}
