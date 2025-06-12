using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using transactions_api.Models;

namespace transactions_api.Interfaces
{
    public interface ITokenService
    {
        public string GenerateJwtToken(AppUser user);
    }
}