using Abp.AspNetCore.Mvc.Controllers;
using Microsoft.AspNet.Identity;
using Abp.IdentityFramework;

namespace AbpCompanyName.AbpProjectName.Web.Controllers
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