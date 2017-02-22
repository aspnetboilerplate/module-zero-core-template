using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp.Zero.AspNetCore;

namespace AbpCompanyName.AbpProjectName.Authentication.External
{
    public abstract class ExternalAuthProviderApiBase : IExternalAuthProviderApi, ITransientDependency
    {
        public ExternalLoginProviderInfo ProviderInfo { get; set; }

        public void Initialize(ExternalLoginProviderInfo providerInfo)
        {
            ProviderInfo = providerInfo;
        }

        public async Task<bool> IsValidUser(string userId, string accessCode)
        {
            var userInfo = await GetUserInfo(accessCode);
            return userInfo.LoginInfo.ProviderKey == userId;
        }

        public abstract Task<ExternalLoginUserInfo> GetUserInfo(string accessCode);
    }
}
