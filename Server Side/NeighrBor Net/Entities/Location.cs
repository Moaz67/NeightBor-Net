namespace NeighrBor_Net.Entities
{
    public class Location
    {
        public long Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        
        public string Name {  get; set; }   
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}
