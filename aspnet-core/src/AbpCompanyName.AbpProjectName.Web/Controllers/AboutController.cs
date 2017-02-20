using Microsoft.AspNetCore.Mvc;

namespace AbpCompanyName.AbpProjectName.Web.Controllers
{
    public class AboutController : AbpProjectNameControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}