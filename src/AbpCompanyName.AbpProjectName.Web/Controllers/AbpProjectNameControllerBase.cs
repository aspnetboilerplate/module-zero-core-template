using Abp.AspNetCore.Mvc.Controllers;

namespace AbpCompanyName.AbpProjectName.Web.Controllers
{
    public abstract class AbpProjectNameControllerBase: AbpController
    {
        protected AbpProjectNameControllerBase()
        {
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }
    }
}