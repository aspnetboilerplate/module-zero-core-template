using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using Abp.Zero.EntityFramework;

namespace AbpCompanyName.AbpProjectName.EntityFramework
{
    [DependsOn(
        typeof(AbpProjectNameCoreModule), 
        typeof(AbpZeroEntityFrameworkModule))]
    public class AbpProjectNameEntityFrameworkModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<AbpProjectNameDbContext>());
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}