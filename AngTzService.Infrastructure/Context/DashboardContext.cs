using AngTzService.Infrastructure.Entity;
using Microsoft.EntityFrameworkCore;

namespace AngTzService.Infrastructure.Context
{
    public class DashboardContext : DbContext
    {
        public DbSet<Post> Post { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<PostFile> PostFile { get; set; }

        public DashboardContext(DbContextOptions<DashboardContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PostFile>()
            .HasOne(p => p.Post)
            .WithMany(b => b.PostFile)
            .HasForeignKey(p => p.IdPost);
        }

    }
}
