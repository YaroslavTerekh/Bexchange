using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bexchange.Domain.Enum;

namespace Bexchange.Domain.Models
{
    public class Book
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required(ErrorMessage = "'Title' field is empty")]
        [MaxLength(100, ErrorMessage = "Too long title")]
        public string Title { get; set; }
        [Required(ErrorMessage = "'Description' field is empty")]
        [MaxLength(500, ErrorMessage = "Too long description (500 max)")]
        [MinLength(50, ErrorMessage = "Too short description (50 min)")]
        public string Description { get; set; }
        [Required(ErrorMessage = "No photo uploaded")]
        [ForeignKey(nameof(Image))]
        public int ImageId { get; set; }
        public Image Image { get; set; }
        public virtual int UserId { get; set; }
        public User User { get; set; }

        public State State { get; set; }
    }
}
