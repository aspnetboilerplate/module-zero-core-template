using System;
using Abp.Modules;
using Abp.MultiTenancy;
using Abp.TestBase;
using Abp.Zero.Configuration;
using AbpCompanyName.AbpProjectName.EntityFramework;
using Castle.MicroKernel.Registration;
using NSubstitute;


namespace AbpCompanyName.AbpProjectName.Tests
{
    [DependsOn(
        typeof(AbpProjectNameApplicationModule),
        typeof(AbpProjectNameEntityFrameworkModule),
        typeof(AbpTestBaseModule)
        )]
    public class AbpProjectNameTestModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.Timeout = TimeSpan.FromMinutes(30);

            //Use database for language management
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            RegisterFakeService<IAbpZeroDbMigrator>();
        }

        private void RegisterFakeService<TService>() where TService : class
        {
            IocManager.IocContainer.Register(
                Component.For<TService>()
                    .UsingFactoryMethod(() => Substitute.For<TService>())
                    .LifestyleSingleton()
            );
        }
    }
}