using System.Collections.Generic;
using System.Configuration;
using Abp.Configuration;

namespace AbpCompanyName.AbpProjectName.Configuration
{
    /// <summary>
    /// Defines settings for the application.
    /// See <see cref="AppSettings"/> for setting names.
    /// </summary>
    public class AppSettingProvider : SettingProvider
    {
        public override IEnumerable<SettingDefinition> GetSettingDefinitions(SettingDefinitionProviderContext context)
        {
            return new[]
                   {
                       //Host settings
                        new SettingDefinition(AppSettings.General.WebSiteRootAddress, "http://localhost:62114/")
                   };
        }
    }
}
