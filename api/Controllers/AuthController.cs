using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using transactions_api.DTOs.AuthDTOs;
using transactions_api.Interfaces;
using transactions_api.Models;

namespace transactions_api.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly SignInManager<AppUser> _signInManager = signInManager;
        private readonly ITokenService _tokenService = tokenService;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO login)
        {
            if (!ModelState.IsValid) return BadRequest(new { message = "Email is not valid." });

            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user == null) return Unauthorized(new { message = "User not found." });

            var result = await _signInManager.CheckPasswordSignInAsync(user, login.Password, false);
            if (!result.Succeeded) return Unauthorized(new { message = "Invalid credentials." });

            var token = _tokenService.GenerateJwtToken(user);

            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO register)
        {
            if (!ModelState.IsValid) return BadRequest(new { code = "InvalidEmail", description = "Email is not valid." });

            var user = new AppUser
            {
                Email = register.Email,
                UserName = register.Email
            };

            var result = await _userManager.CreateAsync(user, register.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok(new { message = "User created successfully." });
        }
    }
}