using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BexchangeAPI.Domain.Annotations
{
    public class ValidBookAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            return value != null && Char.IsUpper(value.ToString()[0]);
        }
    }
}
