using Microsoft.AspNetCore.Mvc.Razor.Internal;
using Abp.AspNetCore.Mvc.Views;
using Abp.Runtime.Session;

namespace Azurely.Serverless.Web.Views
{
    public abstract class ServerlessRazorPage<TModel> : AbpRazorPage<TModel>
    {
        [RazorInject]
        public IAbpSession AbpSession { get; set; }

        protected ServerlessRazorPage()
        {
            LocalizationSourceName = ServerlessConsts.LocalizationSourceName;
        }
    }
}

