using System.ComponentModel.DataAnnotations.Schema;

namespace NeighrBor_Net.Entities
{
    public class BusinessProfile
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string AvailableHours { get; set; }
        public int UserId { get; set; }


        public virtual User? User { get; set; }
        public string? ImagePath { get; set; }
        [NotMapped]
        public IFormFile? Image { get; set; }
        public int NumberOfComplaints { get; set; } = 0;
        [NotMapped]
        public double Rating
        {
            get
            {
                
                if (NumberOfComplaints <= 0) return 5.0;
                if (NumberOfComplaints < 3) return 4.5;
                if (NumberOfComplaints < 10) return 4.0;
                if (NumberOfComplaints < 20) return 3.5;
                return 3.0;
            }
        }
    }
}
