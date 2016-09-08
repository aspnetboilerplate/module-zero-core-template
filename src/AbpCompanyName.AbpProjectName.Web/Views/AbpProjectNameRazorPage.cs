using Abp.AspNetCore.Mvc.Views;

namespace AbpCompanyName.AbpProjectName.Web.Views
{
    public abstract class AbpProjectNameRazorPage<TModel> : AbpRazorPage<TModel>
    {
        protected AbpProjectNameRazorPage()
        {
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }
    }
}
