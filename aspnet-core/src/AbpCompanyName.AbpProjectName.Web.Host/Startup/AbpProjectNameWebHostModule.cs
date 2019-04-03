using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AbpCompanyName.AbpProjectName.Configuration;
using Abp.Configuration.Startup;

namespace AbpCompanyName.AbpProjectName.Web.Host.Startup
{
    [DependsOn(
       typeof(AbpProjectNameWebCoreModule))]
    public class AbpProjectNameWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AbpProjectNameWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
#if DEBUG
            Configuration.Modules.AbpWebCommon().SendAllExceptionsToClients = true;
#endif
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpProjectNameWebHostModule).GetAssembly());
        }
    }
}
