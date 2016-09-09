using Microsoft.AspNetCore.Mvc;
using Microsoft.Owin;
using Microsoft.Owin.Security;

namespace AbpCompanyName.AbpProjectName.Web.Controllers.Results
{
    public class ChallengeResult : UnauthorizedResult
    {
        public ChallengeResult(string provider, string redirectUri)
            : this(provider, redirectUri, null)
        {
        }

        public ChallengeResult(string provider, string redirectUri, string userId)
        {
            LoginProvider = provider;
            RedirectUri = redirectUri;
            UserId = userId;
        }

        public string LoginProvider { get; set; }
        public string RedirectUri { get; set; }
        public string UserId { get; set; }

        public override void ExecuteResult(ActionContext context)
        {
            var properties = new AuthenticationProperties() { RedirectUri = RedirectUri };
            if (UserId != null)
            {
                properties.Dictionary["XsrfId"] = UserId;
            }

            context.HttpContext.Features.Get<IOwinContext>().Authentication.Challenge(properties, LoginProvider);
        }
    }
}