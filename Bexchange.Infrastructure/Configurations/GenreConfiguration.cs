using Bexchange.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Configurations
{
    public class GenreConfiguration : IEntityTypeConfiguration<Genre>
    {
        public void Configure(EntityTypeBuilder<Genre> builder)
        {
            builder.Property(g => g.Title)
                .HasMaxLength(15)
                .IsRequired();

            builder.Property(g => g.Description)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(g => g.ImgPath)
                .IsRequired();
        }
    }
}
