using System.ComponentModel.DataAnnotations;

namespace NeighrBor_Net.Entities
{
    public class Comments
    {
        [Key]
        public int Id { get; set; }
        public long PostId { get; set; }
        public Post? Posts { get; set; }
        public string? Detail { get; set; }
    }
}
