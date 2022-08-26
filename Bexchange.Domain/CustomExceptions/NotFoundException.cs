namespace Bexchange.Domain.CustomExceptions
{
    public class NotFoundException : Exception
    {
        public int Code { get; set; }
        public string Description { get; set; }


        public NotFoundException(string description, int code) : base()
        {
            Code = code;
            Description = description;
        }
    }
}
