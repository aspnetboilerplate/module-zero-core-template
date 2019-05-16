using Abp.EntityFrameworkCore;
using BoundedContext.Domain;
using Microsoft.EntityFrameworkCore;

namespace BoundedContext.Infrastructure
{
    public class FleetDbContext : AbpDbContext
    {
        public virtual DbSet<Vehicle> Vehicles { get; set; }

        public FleetDbContext(DbContextOptions<FleetDbContext> options) : 
            base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new VehiclesEntityTypeConfigurations());
        }
    }
}
