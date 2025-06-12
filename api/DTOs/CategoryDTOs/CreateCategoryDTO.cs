using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace transactions_api.DTOs.CategoryDTOs
{
    public class CreateCategoryDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}