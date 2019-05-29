using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Azurely.Serverless.Controllers
{
    public abstract class ServerlessControllerBase: AbpController
    {
        protected ServerlessControllerBase()
        {
            LocalizationSourceName = ServerlessConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

