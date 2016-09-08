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
                        new SettingDefinition(AppSettings.General.WebSiteRootAddress, "http://localhost:62114/"),
                        new SettingDefinition(AppSettings.TenantManagement.AllowSelfRegistration,ConfigurationManager.AppSettings[AppSettings.TenantManagement.UseCaptchaOnRegistration] ?? "true"),
                        new SettingDefinition(AppSettings.TenantManagement.IsNewRegisteredTenantActiveByDefault,ConfigurationManager.AppSettings[AppSettings.TenantManagement.IsNewRegisteredTenantActiveByDefault] ??"false"),
                        new SettingDefinition(AppSettings.TenantManagement.UseCaptchaOnRegistration,ConfigurationManager.AppSettings[AppSettings.TenantManagement.UseCaptchaOnRegistration] ?? "true"),
                        new SettingDefinition(AppSettings.TenantManagement.DefaultEdition,ConfigurationManager.AppSettings[AppSettings.TenantManagement.DefaultEdition] ?? ""),

                        //Tenant settings
                        new SettingDefinition(AppSettings.UserManagement.AllowSelfRegistration, ConfigurationManager.AppSettings[AppSettings.UserManagement.UseCaptchaOnRegistration] ?? "true", scopes: SettingScopes.Tenant),
                        new SettingDefinition(AppSettings.UserManagement.IsNewRegisteredUserActiveByDefault, ConfigurationManager.AppSettings[AppSettings.UserManagement.IsNewRegisteredUserActiveByDefault] ?? "false", scopes: SettingScopes.Tenant),
                        new SettingDefinition(AppSettings.UserManagement.UseCaptchaOnRegistration, ConfigurationManager.AppSettings[AppSettings.UserManagement.UseCaptchaOnRegistration] ?? "true", scopes: SettingScopes.Tenant)
                   };
        }
    }
}
