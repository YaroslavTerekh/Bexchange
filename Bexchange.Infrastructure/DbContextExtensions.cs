using Bexchange.Infrastructure.DtbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure
{
    public static class DbContextExtensions
    {
        public static IServiceCollection AddDbContextsCustom(this IServiceCollection services, IConfiguration builder)
        {
            services.AddDbContext<ContentDbContext>(
                o => o.UseSqlServer(builder.GetConnectionString("ContentConnection"), b => b.MigrationsAssembly("BookExchange")));
            return services;
        }
    }
}
