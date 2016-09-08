using System;
using Abp.Configuration;
using Abp.Configuration.Startup;
using Abp.Dependency;
using Abp.Extensions;
using Abp.Text;
using Microsoft.AspNetCore.Http;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.MultiTenancy;

namespace AbpCompanyName.AbpProjectName.Web.MultiTenancy
{
    /// <summary>
    /// Finds current tenant's tenancyname from subdomain of current URL.
    /// </summary>
    public class SubdomainTenancyNameFinder : ITenancyNameFinder, ITransientDependency
    {
        private readonly ISettingManager _settingManager;
        private readonly IMultiTenancyConfig _multiTenancyConfig;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SubdomainTenancyNameFinder(
            ISettingManager settingManager, 
            IMultiTenancyConfig multiTenancyConfig,
            IHttpContextAccessor httpContextAccessor)
        {
            _settingManager = settingManager;
            _multiTenancyConfig = multiTenancyConfig;
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentTenancyNameOrNull()
        {
            if (!_multiTenancyConfig.IsEnabled)
            {
                return Tenant.DefaultTenantName;
            }

            var siteRootFormat = _settingManager.GetSettingValue(AppSettings.General.WebSiteRootAddress).EnsureEndsWith('/');

            if (!siteRootFormat.Contains(WebUrlService.TenancyNamePlaceHolder))
            {
                //Web site does not support subdomain tenant name
                return null;
            }

            if (_httpContextAccessor.HttpContext == null)
            {
                //Can not find current URL
                return null;
            }

            var currentRootAddress = GetCurrentSiteRootAddress().EnsureEndsWith('/');
            
            string[] values;
            if (!FormattedStringValueExtracter.IsMatch(currentRootAddress, siteRootFormat, out values, true))
            {
                return null;
            }

            if (values.Length <= 0)
            {
                return null;
            }
            
            if (string.Equals(values[0], "www", StringComparison.InvariantCultureIgnoreCase))
            {
                return null;
            }

            return values[0];
        }

        private string GetCurrentSiteRootAddress()
        {
           return _httpContextAccessor.HttpContext.Request.Scheme + Uri.SchemeDelimiter + _httpContextAccessor.HttpContext.Request.Host;
        }
    }
}