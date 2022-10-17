using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Domain.RequestModels
{
    public class RefreshTokenRequest
    {
        public string RefreshToken { get; set; }
        public int UserId { get; set; }
    }
}
