using Bexchange.Domain;
using Bexchange.Domain.Models;
using Bexchange.Infrastructure.Configurations;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Infrastructure.DtbContext
{
    public class ContentDbContext : IdentityDbContext<User, ApplicationRole, int>
    {
        public ContentDbContext(DbContextOptions<ContentDbContext> opts) : base(opts) { }

        public DbSet<Book> Books { get; set; }
        public DbSet<ExchangeOrder> Orders { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<AddressInfo> Addresses { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Genre> Genres { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            

            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new AuthorConfiguration());
            modelBuilder.ApplyConfiguration(new GenreConfiguration());
            modelBuilder.ApplyConfiguration(new BookConfiguration());
            modelBuilder.ApplyConfiguration(new ExchangeOrderConfiguration());
        }
    }
}
