using Bexchange.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.DtbContext
{
    public class ContentDbContext : DbContext
    {
        public ContentDbContext(DbContextOptions<ContentDbContext> opts) : base(opts) { }

        public DbSet<Book> Books { get; set; }
        public DbSet<ExchangeOrder> Orders { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<AddressInfo> Addresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ExchangeOrder>()
                .HasOne(e => e.FirstBook)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ExchangeOrder>()
                .HasOne(e => e.SecondBook)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
