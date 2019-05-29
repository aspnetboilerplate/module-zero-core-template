using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Azurely.Serverless.Authorization.Roles;
using Azurely.Serverless.Authorization.Users;
using Azurely.Serverless.MultiTenancy;

namespace Azurely.Serverless.EntityFrameworkCore
{
    public class ServerlessDbContext : AbpZeroDbContext<Tenant, Role, User, ServerlessDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public ServerlessDbContext(DbContextOptions<ServerlessDbContext> options)
            : base(options)
        {
        }
    }
}

