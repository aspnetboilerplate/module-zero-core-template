using System.Reflection;
using Abp.EntityFrameworkCore;
using Abp.Modules;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore
{
    [DependsOn(
        typeof(AbpProjectNameCoreModule), 
        typeof(AbpEntityFrameworkCoreModule))]
    public class AbpProjectNameEntityFrameworkCoreModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}