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
    public class AuthorConfiguration : IEntityTypeConfiguration<Author>
    {
        public void Configure(EntityTypeBuilder<Author> builder)
        {
            builder.Property(g => g.Name)
                .HasMaxLength(30)
                .IsRequired();

            builder.Property(g => g.WikiLink)
                .IsRequired();

            builder.Property(g => g.ImgPath)
                .IsRequired();
        }
    }
}
