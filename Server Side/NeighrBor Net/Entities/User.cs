using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeighrBor_Net.Entities
{
    public class User 
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; } 

        [Required]
        public string LastName { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public Roles Role { get; set; }
        public string City { get; set; }
        public ZipCode Zip { get; set; }
        public string? ImagePath { get; set; }
        [NotMapped]
        public IFormFile? Image { get; set; }
        public string? Description { get; set; }
        public long? LocationId { get; set; }
        public Location? Location { get; set; }
    }
    public enum Roles
    {
        Admin=0
    }
    public enum ZipCode
    {
        One = 0
    }
}
