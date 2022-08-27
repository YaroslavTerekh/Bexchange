namespace Bexchange.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public AddressInfoDto Address { get; set; }
        public ICollection<BookDto> Books { get; set; }
    }
}
