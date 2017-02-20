using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AbpCompanyName.AbpProjectName.Web.Controllers
{
    [AbpMvcAuthorize]
    public class HomeController : AbpProjectNameControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}