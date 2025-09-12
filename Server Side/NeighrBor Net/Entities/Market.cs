using System.ComponentModel.DataAnnotations.Schema;

namespace NeighrBor_Net.Entities
{
    public class Market
    {
        public long Id { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }

        public int UserId { get; set; } 
        public virtual User? User { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public long? LocationId { get; set; }
        public Location? Location { get; set; }
        public string LocationName { get; set; }

        public string? ImagePath { get; set; }
        [NotMapped]
        public IFormFile? Image { get; set; }
        public bool IsAvailable { get; set; } = true;
        public decimal Price { get; set; }


    }
}
