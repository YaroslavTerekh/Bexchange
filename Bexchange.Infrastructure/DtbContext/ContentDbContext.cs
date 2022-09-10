using Bexchange.Domain;
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


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            { //modelBuilder.Entity<ExchangeOrder>()
              //    .HasOne(e => e.FirstBook)
              //    .WithMany()
              //    .HasForeignKey(e => e.FirstBookId)
              //    .OnDelete(DeleteBehavior.Restrict);

                //modelBuilder.Entity<ExchangeOrder>()
                //    .HasOne(e => e.SecondBook)
                //    .WithMany()
                //    .HasForeignKey(e => e.SecondBookId)
                //    .OnDelete(DeleteBehavior.Restrict);

                //modelBuilder.Entity<User>()
                //    .HasMany(u => u.Books)
                //    .WithOne()
                //    .HasForeignKey(b => b.UserId)
                //    .OnDelete(DeleteBehavior.Cascade);

                //modelBuilder.Entity<Book>()
                //    .HasOne(b => b.User)
                //    .WithMany(u => u.Books)
                //    .HasForeignKey(b => b.UserId)
                //    .OnDelete(DeleteBehavior.Restrict);
            }

            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new BookConfiguration());
            modelBuilder.ApplyConfiguration(new ExchangeOrderConfiguration());
        }
    }
}
