using AbpCompanyName.AbpProjectName;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BoundedContext.Infrastructure
{
    public class BoundedContextDbContextFactory : IDesignTimeDbContextFactory<FleetDbContext>
    {
        public FleetDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<FleetDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            FleetDbContextConfigurer.Configure(builder, configuration.GetConnectionString(AbpProjectNameConsts.ConnectionStringName));

            return new FleetDbContext(builder.Options);
        }
    }
}
