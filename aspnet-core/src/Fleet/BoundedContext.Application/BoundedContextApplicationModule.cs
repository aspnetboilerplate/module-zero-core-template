using Abp.Modules;
using Abp.Reflection.Extensions;

namespace BoundedContext.Infrastructure
{
    [DependsOn(
        typeof(BoundedContextDomainModule)
    )]
    public class BoundedContextApplicationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(BoundedContextApplicationModule).GetAssembly());
        }
    }
}
