using Microsoft.AspNetCore.Mvc.Razor.Internal;
using Abp.AspNetCore.Mvc.Views;
using Abp.Runtime.Session;

namespace AbpCompanyName.AbpProjectName.Web.Views
{
    public abstract class AbpProjectNameRazorPage<TModel> : AbpRazorPage<TModel>
    {
        [RazorInject]
        public IAbpSession AbpSession { get; set; }

        protected AbpProjectNameRazorPage()
        {
            LocalizationSourceName = AbpProjectNameConsts.LocalizationSourceName;
        }
    }
}
