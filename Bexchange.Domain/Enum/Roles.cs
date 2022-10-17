using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Domain.Enum
{
    public enum Roles
    {
        User = 1,
        Admin = 2,
        SuperAdmin = 4
    }

    //public class Test
    //{
    //    public void Test1()
    //    {
    //        Roles roles = Roles.User | Roles.SuperAdmin;
    //        var isAdmin = roles.HasFlag(Roles.Admin);
    //    }
    //}
}
