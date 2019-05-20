using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using BoundedContext.Domain;

namespace BoundedContext.Application
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
