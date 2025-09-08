using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NeighrBor_Net.Entities
{
    public class Post
    {
        public long Id { get; set; }
        public string? detail { get; set; }
        public string AttachmentPath { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public long? LocationId { get; set; }
        public Location? Location { get; set; }
        [ForeignKey("AuthorId")]
        public int UserId { get; set; }

        
        public virtual User? User { get; set; }
        public string? ImagePath { get; set; }
        public PostType Type { get; set; }  
        public int Likes { get; set; }
        public int Comments { get; set; }
        [NotMapped]
        public IFormFile? Image { get; set; }
        public ICollection<Comments> Commentss { get; set; }
    }
    public class PostDto
    {
        
        public string? detail { get; set; }
        public string AttachmentPath { get; set; } = string.Empty;
        
        public long? LocationId { get; set; }
       
        public string? ImagePath { get; set; }
        public int Likes { get; set; }
        public int Comments { get; set; }
    }
    public enum PostType {
        General=0,
        Alert=1,
        Recommendation =2,
        MarketPlace=3,
        Event=4
    }
}
