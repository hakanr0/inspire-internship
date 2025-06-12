using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using transactions_api.DTOs.ExpenseDTOs;
using transactions_api.Models;

namespace transactions_api.Mappers
{
    public static class ExpenseMappers
    {
        public static ExpenseDTO ToExpenseDTO(this Expense expense)
        {
            return new ExpenseDTO
            {
                Id = expense.Id,
                Title = expense.Title,
                Value = expense.Value,
                Category = expense.Category,
                CreatedAt = expense.CreatedAt,
                UpdatedAt = expense.UpdatedAt
            };
        }

        public static Expense ToExpenseFromCreate(this CreateExpenseDTO create)
        {
            return new Expense
            {
                Title = create.Title,
                CategoryId = create.CategoryId,
                Value = create.Value,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
        }
    }
}