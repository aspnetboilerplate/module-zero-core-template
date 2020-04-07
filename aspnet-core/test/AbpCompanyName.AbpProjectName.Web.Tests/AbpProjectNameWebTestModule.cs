using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace AbpCompanyName.AbpProjectName.Web.Tests
{
    [DependsOn(
        typeof(AbpProjectNameWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class AbpProjectNameWebTestModule : AbpModule
    {
        public AbpProjectNameWebTestModule(AbpProjectNameEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpProjectNameWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(AbpProjectNameWebMvcModule).Assembly);
        }
    }
}