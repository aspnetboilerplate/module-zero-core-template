using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AbpCompanyName.AbpProjectName.Web.Views.Shared.Components.ControlSidebar
{
    public class ControlSidebarViewComponent : AbpProjectNameViewComponent
    {
        public ControlSidebarViewComponent()
        {
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var model = new ControlSidebarViewModel();
            return View(model);
        }
    }
}
