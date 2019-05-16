using Abp.Modules;
using Abp.Reflection.Extensions;

namespace BoundedContext.Infrastructure
{
    public class BoundedContextDomainModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(BoundedContextDomainModule).GetAssembly());
        }
    }
}
