using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Abp.Zero.AspNetCore;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authentication.MicrosoftAccount;
using Newtonsoft.Json.Linq;

namespace AbpCompanyName.AbpProjectName.Authentication.External.Microsoft
{
    public class MicrosoftAuthProviderApi : ExternalAuthProviderApiBase
    {
        public const string Name = "Microsoft";

        public override async Task<ExternalLoginUserInfo> GetUserInfo(string accessCode)
        {
            /* TODO: Microsoft login could not be tested because of a problem on Angular2 application.
             * see login.service.ts in Angular2 application.
             * This is not a problem for MVC application since it uses server side login.
             */

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.UserAgent.ParseAdd("Microsoft ASP.NET Core OAuth middleware");
                client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
                client.Timeout = TimeSpan.FromSeconds(30);
                client.MaxResponseContentBufferSize = 1024 * 1024 * 10; // 10 MB

                var request = new HttpRequestMessage(HttpMethod.Get, MicrosoftAccountDefaults.UserInformationEndpoint);
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessCode);

                var response = await client.SendAsync(request);

                response.EnsureSuccessStatusCode();

                var payload = JObject.Parse(await response.Content.ReadAsStringAsync());

                return new ExternalLoginUserInfo
                {
                    Name = MicrosoftAccountHelper.GetDisplayName(payload),
                    EmailAddress = MicrosoftAccountHelper.GetEmail(payload),
                    Surname = MicrosoftAccountHelper.GetSurname(payload),
                    LoginInfo = new UserLoginInfo(Name, MicrosoftAccountHelper.GetId(payload))
                };
            }
        }
    }
}
