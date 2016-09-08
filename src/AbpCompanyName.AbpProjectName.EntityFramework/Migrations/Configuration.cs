using System.Data.Entity.Migrations;
using Abp.MultiTenancy;
using Abp.Zero.EntityFramework;
using AbpCompanyName.AbpProjectName.Migrations.SeedData;
using EntityFramework.DynamicFilters;

namespace AbpCompanyName.AbpProjectName.Migrations
{
    public sealed class Configuration : DbMigrationsConfiguration<AbpProjectName.EntityFramework.AbpProjectNameDbContext>, IMultiTenantSeed
    {
        public AbpTenantBase Tenant { get; set; }

        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "AbpProjectName";
        }

        protected override void Seed(AbpProjectName.EntityFramework.AbpProjectNameDbContext context)
        {
            context.DisableAllFilters();

            if (Tenant == null)
            {
                //Host seed
                new InitialHostDbBuilder(context).Create();

                //Default tenant seed (in host database).
                new DefaultTenantCreator(context).Create();
                new TenantRoleAndUserBuilder(context, 1).Create();
            }
            else
            {
                //You can add seed for tenant databases and use Tenant property...
            }

            context.SaveChanges();
        }
    }
}
