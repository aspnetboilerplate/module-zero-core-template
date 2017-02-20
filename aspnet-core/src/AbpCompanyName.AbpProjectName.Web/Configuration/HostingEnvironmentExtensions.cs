using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using AbpCompanyName.AbpProjectName.Configuration;

namespace AbpCompanyName.AbpProjectName.Web.Configuration
{
    public static class HostingEnvironmentExtensions
    {
        public static IConfigurationRoot GetAppConfiguration(this IHostingEnvironment env)
        {
            return AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName, env.IsDevelopment());
        }
    }
}