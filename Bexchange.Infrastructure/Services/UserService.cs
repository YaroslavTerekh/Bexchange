using BexchangeAPI.Domain.Enum;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Services
{
    public class UserService : IUserService
    {
        public int GetUserId(HttpContext context)
        {
            var identity = context.User.Identity as ClaimsIdentity;
            var id = identity.FindFirst("id").Value;
            return Int32.Parse(id);
        }

        public bool IsAdmin(HttpContext context)
        {
            var identity = context.User.Identity as ClaimsIdentity;
            var role = identity.FindFirst(ClaimTypes.Role).Value;

            return role == Roles.Admin.ToString() | role == Roles.SuperAdmin.ToString() ? true : false;
        }
    }
}
