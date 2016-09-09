using System.Threading.Tasks;
using Abp.Configuration.Startup;
using Abp.Runtime.Session;
using AbpCompanyName.AbpProjectName.Sessions;
using Microsoft.AspNetCore.Mvc;

namespace AbpCompanyName.AbpProjectName.Web.Views.Shared.Components.UserMenuOrLoginLink
{
    public class UserMenuOrLoginLinkViewComponent : ViewComponent
    {
        private readonly IAbpSession _abpSession;
        private readonly ISessionAppService _sessionAppService;
        private readonly IMultiTenancyConfig _multiTenancyConfig;

        public UserMenuOrLoginLinkViewComponent(
            IAbpSession abpSession, 
            ISessionAppService sessionAppService, 
            IMultiTenancyConfig multiTenancyConfig)
        {
            _abpSession = abpSession;
            _sessionAppService = sessionAppService;
            _multiTenancyConfig = multiTenancyConfig;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            UserMenuOrLoginLinkViewModel model;

            if (_abpSession.UserId.HasValue)
            {
                model = new UserMenuOrLoginLinkViewModel
                {
                    LoginInformations = await _sessionAppService.GetCurrentLoginInformations(),
                    IsMultiTenancyEnabled = _multiTenancyConfig.IsEnabled,
                };
            }
            else
            {
                model = new UserMenuOrLoginLinkViewModel
                {
                    IsMultiTenancyEnabled = _multiTenancyConfig.IsEnabled
                };
            }

            return View(model);
        }
    }
}
