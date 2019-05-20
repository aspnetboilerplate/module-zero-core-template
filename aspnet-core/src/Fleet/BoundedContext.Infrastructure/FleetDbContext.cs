using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Abp.EntityFrameworkCore;
using Abp.EntityHistory;
using BoundedContext.Domain;
using Microsoft.EntityFrameworkCore;

namespace BoundedContext.Infrastructure
{
    public class FleetDbContext : AbpDbContext
    {
        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public IEntityHistoryHelper EntityHistoryHelper { get; set; }

        public FleetDbContext(DbContextOptions<FleetDbContext> options) : 
            base(options)
        {
        }
        public override int SaveChanges()
        {
            var changeSet = EntityHistoryHelper?.CreateEntityChangeSet(ChangeTracker.Entries().ToList());

            var result = base.SaveChanges();

            EntityHistoryHelper?.Save(changeSet);

            return result;
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            var changeSet = EntityHistoryHelper?.CreateEntityChangeSet(ChangeTracker.Entries().ToList());

            var result = await base.SaveChangesAsync(cancellationToken);

            if (EntityHistoryHelper != null)
            {
                await EntityHistoryHelper.SaveAsync(changeSet);
            }

            return result;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new VehiclesEntityTypeConfigurations());
        }
    }
}
