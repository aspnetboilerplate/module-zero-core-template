using Abp.AspNetCore.Mvc.Authorization;
using AbpCompanyName.AbpProjectName.Controllers;
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