using Microsoft.AspNetCore.Antiforgery;
using Azurely.Serverless.Controllers;

namespace Azurely.Serverless.Web.Host.Controllers
{
    public class AntiForgeryController : ServerlessControllerBase
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

