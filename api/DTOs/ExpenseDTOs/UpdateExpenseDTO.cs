using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace transactions_api.DTOs.ExpenseDTOs
{
    public class UpdateExpenseDTO
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public decimal Value { get; set; }
    }
}