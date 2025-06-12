using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using transactions_api.DTOs.CategoryDTOs;
using transactions_api.Models;

namespace transactions_api.Mappers
{
    public static class CategoryMappers
    {
        public static Category ToCategoryFromCreate(this CreateCategoryDTO create)
        {
            return new Category
            {
                Name = create.Name
            };
        }
    }
}