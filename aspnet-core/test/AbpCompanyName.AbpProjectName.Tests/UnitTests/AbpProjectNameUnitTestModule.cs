using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace AbpCompanyName.AbpProjectName.Tests.UnitTests
{
    [DependsOn(typeof(AbpAutoMapperModule))]
    public class AbpProjectNameUnitTestModule : AbpModule
    {
        public override void Initialize()
        {
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            // Alternately we could DependsOn(typeof(ShieldedAlphaApplicationModule)), but that would require EF module dependencies
            InitAutoMapper();
        }

        private void InitAutoMapper()
        {
            var applicationModule = typeof(AbpProjectNameCoreModule).GetAssembly();
            Configuration.Modules.AbpAutoMapper().Configurators.Add(cfg => { cfg.AddProfiles(applicationModule); });
        }
    }
}