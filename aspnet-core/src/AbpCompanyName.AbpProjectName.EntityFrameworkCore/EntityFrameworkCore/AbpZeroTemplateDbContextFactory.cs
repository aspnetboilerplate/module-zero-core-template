using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class AbpProjectNameDbContextFactory : IDbContextFactory<AbpProjectNameDbContext>
    {
        public AbpProjectNameDbContext Create(DbContextFactoryOptions options)
        {
            var builder = new DbContextOptionsBuilder<AbpProjectNameDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            AbpProjectNameDbContextConfigurer.Configure(builder, configuration.GetConnectionString(AbpProjectNameConsts.ConnectionStringName));
            
            return new AbpProjectNameDbContext(builder.Options);
        }
    }
}