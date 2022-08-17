using Bexchange.Domain.Models;

namespace Bexchange.DTOs
{
    public class BookDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Image Image { get; set; }
        public int UserId { get; set; }
    }
}
