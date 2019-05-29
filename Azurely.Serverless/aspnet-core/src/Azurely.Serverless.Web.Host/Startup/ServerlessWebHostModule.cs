using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Azurely.Serverless.Configuration;

namespace Azurely.Serverless.Web.Host.Startup
{
    [DependsOn(
       typeof(ServerlessWebCoreModule))]
    public class ServerlessWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ServerlessWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ServerlessWebHostModule).GetAssembly());
        }
    }
}

