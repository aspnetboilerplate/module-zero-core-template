using System;
using Abp.Dependency;
using AbpCompanyName.AbpProjectName.Identity;
using BoundedContext.Infrastructure;
using Castle.MicroKernel.Registration;
using Castle.Windsor.MsDependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace FleetTests.DependencyInjection
{
    public static class ServiceCollectionRegistrar
    {
        public static void Register(IIocManager iocManager)
        {
            var services = new ServiceCollection();

            IdentityRegistrar.Register(services);

            services.AddEntityFrameworkInMemoryDatabase();

            var serviceProvider = WindsorRegistrationHelper.CreateServiceProvider(iocManager.IocContainer, services);

            var databaseName = Guid.NewGuid().ToString();

            var builder = new DbContextOptionsBuilder<FleetDbContext>();
            builder.UseInMemoryDatabase(databaseName).UseApplicationServiceProvider(serviceProvider);

            
            iocManager.IocContainer.Register(
                Component
                    .For<DbContextOptions<FleetDbContext>>()
                    .Instance(builder.Options)
                    .LifestyleSingleton()
            );
        }
    }
}
