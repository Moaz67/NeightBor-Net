using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NeighrBor_Net.DBContext;
using NeighrBor_Net.Entities;
using Org.BouncyCastle.Crypto.Generators;
using System.Security.Claims;

namespace NeighrBor_Net.Controllers
{
    public class AuthController:ControllerBase
    {
        private readonly JwtService _jwtService;
        private NeighBorNetDB _dbContext;
        public AuthController(JwtService jwtService, NeighBorNetDB dbContext)
        {
            _jwtService = jwtService;
            _dbContext = dbContext;
        }

       
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            if (string.IsNullOrWhiteSpace(login.Username) || string.IsNullOrWhiteSpace(login.Password))
            {
                return BadRequest("Username and password are required");
            }

            
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == login.Email || u.Email == login.Username);

            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            
            bool validPassword = BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash);
            if (!validPassword)
            {
                return Unauthorized("Invalid credentials");
            }
         

            var token = _jwtService.GenerateToken(user.Id.ToString(), user.Email, user.Role.ToString());
           

            Response.Cookies.Append("authToken", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddMinutes(30)
            });

            return Ok(new
            {
                message = "Login successful",
                id = user.Id,
                email = user.Email,
                role = user.Role.ToString()
            });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] LoginDto signup)
        {
            if (string.IsNullOrEmpty(signup.Username) || string.IsNullOrEmpty(signup.Password) || string.IsNullOrEmpty(signup.Email))
            {
                return BadRequest("Username, password, and email are required");
            }

           
            var existingUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == signup.Email);
            if (existingUser != null)
            {
                return Conflict("Email already registered");
            }

           
            var user = new User
            {
                FirstName = signup.Username,   
                LastName = signup.FullName ?? "",
                Email = signup.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(signup.Password), 
                Role = Roles.Admin,
                City=signup.City,
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            
            var token = _jwtService.GenerateToken(user.Id.ToString(), user.Email, user.Role.ToString());

           
            Response.Cookies.Append("authToken", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddMinutes(30)
            });

            return Ok(new { message = "Signup successful" });
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("authToken");
            return Ok(new { message = "Logged out successfully" });
        }



    }
    public class LoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        //public ZipCode Zip { get; set; }
    }
}
