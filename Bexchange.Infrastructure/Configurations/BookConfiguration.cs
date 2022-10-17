using BexchangeAPI.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Infrastructure.Configurations
{
    internal class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.Property(b => b.Id)
                .IsRequired();

            builder.Property(b => b.Title)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(b => b.Description)
                .HasMaxLength(1900)
                .IsRequired();

            builder.Property(b => b.ImageId)
                .IsRequired();

            builder.HasOne(b => b.Image)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(b => b.User)
                .WithMany(u => u.Books)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(b => b.Comments)
                .WithOne()                
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
