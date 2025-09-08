using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using NeighrBor_Net.Entities;

namespace NeighrBor_Net.DBContext
{
    public class NeighBorNetDB : DbContext
    {
        public NeighBorNetDB(DbContextOptions<NeighBorNetDB> options)
            : base(options)
        {
        }

        
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Comments> Coments { get; set; }

    }
}

