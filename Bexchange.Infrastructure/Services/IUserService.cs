using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Services
{
    public interface IUserService
    {
        public int GetUserId(HttpContext context);
        public bool IsAdmin(HttpContext context);
    }
}
