using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using transactions_api.Models;

namespace transactions_api.DTOs.ExpenseDTOs
{
    public class ExpenseDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public Category? Category { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}