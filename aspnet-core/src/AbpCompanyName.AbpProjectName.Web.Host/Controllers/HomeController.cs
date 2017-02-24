using AbpCompanyName.AbpProjectName.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace AbpCompanyName.AbpProjectName.Web.Host.Controllers
{
    public class HomeController : AbpProjectNameControllerBase
    {
        public IActionResult Index()
        {
            return Redirect("/swagger/ui");
        }
    }
}