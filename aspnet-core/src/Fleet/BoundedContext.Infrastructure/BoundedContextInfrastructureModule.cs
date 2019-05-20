using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using BoundedContext.Application;

namespace BoundedContext.Infrastructure
{
    [DependsOn(typeof(BoundedContextApplicationModule))]
    public class BoundedContextInfrastructureModule : AbpModule
    {
        public bool SkipDbContextRegistration { get; set; }
        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<FleetDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        FleetDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        FleetDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }
        }


        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(BoundedContextInfrastructureModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            
        }
    }
}
