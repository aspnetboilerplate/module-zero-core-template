using AbpCompanyName.AbpProjectName.Controllers;
using Microsoft.AspNetCore.Antiforgery;

namespace AbpCompanyName.AbpProjectName.Web.Host.Controllers
{
    public class AntiForgeryController : AbpProjectNameControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}