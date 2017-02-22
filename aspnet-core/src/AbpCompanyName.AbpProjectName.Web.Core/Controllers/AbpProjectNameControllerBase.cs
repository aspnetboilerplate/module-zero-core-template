using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNet.Identity;

namespace AbpCompanyName.AbpProjectName.Controllers
{
    public abstract class AbpProjectNameControllerBase: AbpController
    {
        protected AbpProjectNameControllerBase()
        {
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}