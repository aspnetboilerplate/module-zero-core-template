using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Azurely.Serverless.Configuration;
using Azurely.Serverless.Web;

namespace Azurely.Serverless.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class ServerlessDbContextFactory : IDesignTimeDbContextFactory<ServerlessDbContext>
    {
        public ServerlessDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ServerlessDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            ServerlessDbContextConfigurer.Configure(builder, configuration.GetConnectionString(ServerlessConsts.ConnectionStringName));

            return new ServerlessDbContext(builder.Options);
        }
    }
}

