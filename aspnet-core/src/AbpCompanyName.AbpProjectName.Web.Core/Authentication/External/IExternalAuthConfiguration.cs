using System.Collections.Generic;

namespace AbpCompanyName.AbpProjectName.Authentication.External
{
    public interface IExternalAuthConfiguration
    {
        List<ExternalLoginProviderInfo> Providers { get; }
    }
}
