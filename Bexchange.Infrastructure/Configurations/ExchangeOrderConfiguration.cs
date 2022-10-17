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
    internal class ExchangeOrderConfiguration : IEntityTypeConfiguration<ExchangeOrder>
    {
        public void Configure(EntityTypeBuilder<ExchangeOrder> builder)
        {
            builder.Property(e => e.Id).IsRequired();

            builder.HasOne(e => e.FirstBook)
                .WithMany()
                .HasForeignKey(e => e.FirstBookId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.SecondBook)
                .WithMany()
                .HasForeignKey(e => e.SecondBookId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
