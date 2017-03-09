using System.Reflection;
using Abp.Modules;
using Abp.Zero.AspNetCore;
using AbpCompanyName.AbpProjectName.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace AbpCompanyName.AbpProjectName.Web.Startup
{
    [DependsOn(typeof(AbpProjectNameWebCoreModule))]
    public class AbpProjectNameWebMvcModule : AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AbpProjectNameWebMvcModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            Configuration.Get<IAbpZeroAspNetCoreConfiguration>().AuthenticationScheme = AuthConfigurer.AuthenticationScheme;

            Configuration.Navigation.Providers.Add<AbpProjectNameNavigationProvider>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}