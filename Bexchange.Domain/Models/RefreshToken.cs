namespace BexchangeAPI.Domain.Models
{
    public class RefreshToken
    {
        public string Token { get; set; }
        public DateTime CreateTime { get; set; } = DateTime.Now;
        public DateTime Expires { get; set; }
    }
}
