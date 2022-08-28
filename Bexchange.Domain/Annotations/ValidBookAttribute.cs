using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Domain.Annotations
{
    public class ValidBookAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value == null || Char.IsUpper(value.ToString()[0]))
            {
                return false;
            }
            return true;
        }
    }
}
