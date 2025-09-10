using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NeighrBor_Net.DBContext;
using NeighrBor_Net.Entities;
using System;

namespace NeighrBor_Net.Controllers
{
    public class BusinessProfilesController :ControllerBase
    {
        private readonly NeighBorNetDB _context;
        private readonly IWebHostEnvironment _env;

        public BusinessProfilesController(NeighBorNetDB context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var businesses = await _context.BBusinessProfile
                .Include(b => b.User)
                .ToListAsync();

            var response = businesses.Select(b => new
            {
                b.Id,
                b.Name,
                b.Description,
                b.Address,
                b.PhoneNumber,
                b.Email,
                Hours = b.AvailableHours,
                Image = string.IsNullOrEmpty(b.ImagePath) ? null : baseUrl + b.ImagePath,
                b.NumberOfComplaints,
                Rating = b.Rating
            });

            return Ok(response);
        }

       
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var business = await _context.BBusinessProfile.FindAsync(id);
            if (business == null) return NotFound();

            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            return Ok(new
            {
                business.Id,
                business.Name,
                business.Description,
                business.Address,
                business.PhoneNumber,
                business.Email,
                Hours = business.AvailableHours,
                Image = string.IsNullOrEmpty(business.ImagePath) ? null : baseUrl + business.ImagePath,
                business.NumberOfComplaints,
                Rating = business.Rating
            });
        }

        
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] BusinessProfile model)
        {
            if (model.Image != null)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(model.Image.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.Image.CopyToAsync(stream);
                }

                model.ImagePath = "/uploads/" + fileName;
            }

            _context.BBusinessProfile.Add(model);
            await _context.SaveChangesAsync();
            return Ok(model);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, [FromForm] BusinessProfile model)
        {
            var business = await _context.BBusinessProfile.FindAsync(id);
            if (business == null) return NotFound();

            business.Name = model.Name;
            business.Description = model.Description;
            business.Address = model.Address;
            business.PhoneNumber = model.PhoneNumber;
            business.Email = model.Email;
            business.AvailableHours = model.AvailableHours;

            if (model.Image != null)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(model.Image.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.Image.CopyToAsync(stream);
                }

                business.ImagePath = "/uploads/" + fileName;
            }

            _context.BBusinessProfile.Update(business);
            await _context.SaveChangesAsync();

            return Ok(business);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var business = await _context.BBusinessProfile.FindAsync(id);
            if (business == null) return NotFound();

            _context.BBusinessProfile.Remove(business);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Deleted successfully" });
        }
    }
}
