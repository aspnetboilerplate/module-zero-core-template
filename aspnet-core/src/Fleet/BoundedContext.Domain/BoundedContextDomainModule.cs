using Abp.Modules;
using Abp.Reflection.Extensions;

namespace BoundedContext.Domain
{
    public class BoundedContextDomainModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(BoundedContextDomainModule).GetAssembly());
        }
    }
}
