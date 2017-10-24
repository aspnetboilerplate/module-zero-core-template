using Abp.AspNetCore.Mvc.ViewComponents;

namespace AbpCompanyName.AbpProjectName.Web.Views
{
    public abstract class AbpProjectNameViewComponent : AbpViewComponent
    {
        protected AbpProjectNameViewComponent()
        {
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }
    }
}
