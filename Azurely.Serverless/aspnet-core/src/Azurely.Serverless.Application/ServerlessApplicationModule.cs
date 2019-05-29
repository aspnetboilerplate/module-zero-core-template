using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Azurely.Serverless.Authorization;

namespace Azurely.Serverless
{
    [DependsOn(
        typeof(ServerlessCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class ServerlessApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ServerlessAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ServerlessApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}

