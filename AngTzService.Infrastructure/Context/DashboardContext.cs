using AngTzService.Infrastructure.Entity;
using Microsoft.EntityFrameworkCore;

namespace AngTzService.Infrastructure.Context
{
    public class DashboardContext : DbContext
    {
        public DbSet<Post> Post { get; set; }

        public DbSet<User> User { get; set; }

        public DashboardContext(DbContextOptions<DashboardContext> options)
        : base(options)
        {
        }

    }
}
