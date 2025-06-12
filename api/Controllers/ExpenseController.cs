using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using transactions_api.DTOs.ExpenseDTOs;
using transactions_api.Interfaces;
using transactions_api.Mappers;

namespace transactions_api.Controllers
{
    [Route("api/expenses")]
    [ApiController]
    public class ExpenseController(IExpenseRepository expenseRepo) : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepo = expenseRepo;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _expenseRepo.GetAllAsync());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateExpenseDTO create)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            return Ok(await _expenseRepo.CreateAsync(create.ToExpenseFromCreate()));
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExpenseDTO update)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await _expenseRepo.UpdateAsync(id, update);
            if (result == null) return BadRequest("Expense with given ID does not exist.");

            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var result = await _expenseRepo.DeleteAsync(id);
            if (result == null) return BadRequest("Expense with given ID does not exist.");

            return NoContent();
        }
    }
}