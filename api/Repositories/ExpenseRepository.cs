using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using transactions_api.Data;
using transactions_api.DTOs.ExpenseDTOs;
using transactions_api.Interfaces;
using transactions_api.Models;
using transactions_api.Mappers;

namespace transactions_api.Repositories
{
    public class ExpenseRepository(AppDbContext context) : IExpenseRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<ExpenseDTO> CreateAsync(Expense expense)
        {
            await _context.Expenses.AddAsync(expense);
            await _context.SaveChangesAsync();

            if (expense.CategoryId != null)
            {
                await _context.Expenses.Entry(expense).Reference(e => e.Category).LoadAsync();
            }

            return expense.ToExpenseDTO();
        }

        public async Task<Expense?> DeleteAsync(int id)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(e => e.Id == id);
            if (expense == null) return null;

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task<List<ExpenseDTO>> GetAllAsync()
        {
            return await _context.Expenses
            .Include(e => e.Category)
            .OrderByDescending(e => e.UpdatedAt)
            .Select(e => e.ToExpenseDTO())
            .ToListAsync();
        }

        public async Task<ExpenseDTO?> UpdateAsync(int id, UpdateExpenseDTO update)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(e => e.Id == id);
            if (expense == null) return null;

            expense.Title = update.Title;
            expense.CategoryId = update.CategoryId;
            expense.Value = update.Value;
            expense.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            await _context.Expenses.Entry(expense).Reference(e => e.Category).LoadAsync();
            return expense.ToExpenseDTO();
        }
    }
}