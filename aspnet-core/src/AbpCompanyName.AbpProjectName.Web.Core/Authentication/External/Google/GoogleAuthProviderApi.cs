using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Google;
using Newtonsoft.Json.Linq;

namespace AbpCompanyName.AbpProjectName.Authentication.External.Google
{
    public class GoogleAuthProviderApi : ExternalAuthProviderApiBase
    {
        public const string Name = "Google";

        public override async Task<ExternalAuthUserInfo> GetUserInfo(string accessCode)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.UserAgent.ParseAdd("Microsoft ASP.NET Core OAuth middleware");
                client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
                client.Timeout = TimeSpan.FromSeconds(30);
                client.MaxResponseContentBufferSize = 1024 * 1024 * 10; // 10 MB

                var request = new HttpRequestMessage(HttpMethod.Get, GoogleDefaults.UserInformationEndpoint);
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessCode);

                var response = await client.SendAsync(request);

                response.EnsureSuccessStatusCode();

                var payload = JObject.Parse(await response.Content.ReadAsStringAsync());

                return new ExternalAuthUserInfo
                {
                    Name = GoogleHelper.GetName(payload),
                    EmailAddress = GoogleHelper.GetEmail(payload),
                    Surname = GoogleHelper.GetFamilyName(payload),
                    ProviderKey = GoogleHelper.GetId(payload),
                    Provider = Name
                };
            }
        }
    }
}
