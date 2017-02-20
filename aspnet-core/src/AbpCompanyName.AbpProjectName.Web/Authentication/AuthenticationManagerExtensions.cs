using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Abp.Extensions;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Http.Authentication;

namespace AbpCompanyName.AbpProjectName.Web.Authentication
{
    public static class AuthenticationManagerExtensions
    {
        public static async Task<ExternalLoginUserInfo> GetExternalLoginUserInfo(this AuthenticationManager authenticationManager, string authSchema)
        {
            var authInfo = await authenticationManager.GetAuthenticateInfoAsync(authSchema);
            if (authInfo == null)
            {
                return null;
            }

            var claims = authInfo.Principal.Claims.ToList();

            var userInfo = new ExternalLoginUserInfo
            {
                LoginInfo = new UserLoginInfo(
                    authInfo.Properties.Items["LoginProvider"],
                    authInfo.Principal.FindFirst(ClaimTypes.NameIdentifier)?.Value
                )
            };

            var givennameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName);
            if (givennameClaim != null && !givennameClaim.Value.IsNullOrEmpty())
            {
                userInfo.Name = givennameClaim.Value;
            }

            var surnameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Surname);
            if (surnameClaim != null && !surnameClaim.Value.IsNullOrEmpty())
            {
                userInfo.Surname = surnameClaim.Value;
            }

            if (userInfo.Name == null || userInfo.Surname == null)
            {
                var nameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
                if (nameClaim != null)
                {
                    var nameSurName = nameClaim.Value;
                    if (!nameSurName.IsNullOrEmpty())
                    {
                        var lastSpaceIndex = nameSurName.LastIndexOf(' ');
                        if (lastSpaceIndex < 1 || lastSpaceIndex > (nameSurName.Length - 2))
                        {
                            userInfo.Name = userInfo.Surname = nameSurName;
                        }
                        else
                        {
                            userInfo.Name = nameSurName.Substring(0, lastSpaceIndex);
                            userInfo.Surname = nameSurName.Substring(lastSpaceIndex);
                        }
                    }
                }
            }

            var emailClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)
                             ?? claims.FirstOrDefault(c => c.Type == System.IdentityModel.Claims.ClaimTypes.Email);

            if (emailClaim != null)
            {
                userInfo.EmailAddress = emailClaim.Value;
            }

            return userInfo;
        }
    }
}
