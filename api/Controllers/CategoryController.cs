using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using transactions_api.DTOs.CategoryDTOs;
using transactions_api.Interfaces;
using transactions_api.Mappers;

namespace transactions_api.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController(ICategoryRepository categoryRepo) : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo = categoryRepo;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _categoryRepo.GetAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDTO create)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var category = await _categoryRepo.CreateAsync(create.ToCategoryFromCreate());
            return Ok(category);
        }

    }
}