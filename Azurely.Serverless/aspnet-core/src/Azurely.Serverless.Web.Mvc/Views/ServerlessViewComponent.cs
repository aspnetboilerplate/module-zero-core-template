using Abp.AspNetCore.Mvc.ViewComponents;

namespace Azurely.Serverless.Web.Views
{
    public abstract class ServerlessViewComponent : AbpViewComponent
    {
        protected ServerlessViewComponent()
        {
            LocalizationSourceName = ServerlessConsts.LocalizationSourceName;
        }
    }
}

