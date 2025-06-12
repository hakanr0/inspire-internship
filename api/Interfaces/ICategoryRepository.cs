using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using transactions_api.Models;

namespace transactions_api.Interfaces
{
    public interface ICategoryRepository
    {
        public Task<List<Category>> GetAllAsync();
        public Task<Category> CreateAsync(Category category);
    }
}