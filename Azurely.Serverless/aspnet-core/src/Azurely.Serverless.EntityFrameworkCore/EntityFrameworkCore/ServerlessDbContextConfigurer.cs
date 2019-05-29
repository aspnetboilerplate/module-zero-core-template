using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Azurely.Serverless.EntityFrameworkCore
{
    public static class ServerlessDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ServerlessDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ServerlessDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}

