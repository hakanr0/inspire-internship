using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using transactions_api.DTOs.ExpenseDTOs;
using transactions_api.Models;

namespace transactions_api.Interfaces
{
    public interface IExpenseRepository
    {
        public Task<List<ExpenseDTO>> GetAllAsync();
        public Task<ExpenseDTO> CreateAsync(Expense expense);
        public Task<ExpenseDTO?> UpdateAsync(int id, UpdateExpenseDTO update);
        public Task<Expense?> DeleteAsync(int id);
    }
}