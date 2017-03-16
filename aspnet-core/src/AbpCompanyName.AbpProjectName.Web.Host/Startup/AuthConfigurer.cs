using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Runtime.Security;
using AbpCompanyName.AbpProjectName.Authentication.External;
using AbpCompanyName.AbpProjectName.Authentication.External.Facebook;
using AbpCompanyName.AbpProjectName.Authentication.External.Google;
using AbpCompanyName.AbpProjectName.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace AbpCompanyName.AbpProjectName.Web.Host.Startup
{
    public static class AuthConfigurer
    {
        /// <summary>
        /// Configures the specified application.
        /// </summary>
        /// <param name="app">The application.</param>
        /// <param name="configuration">The configuration.</param>
        public static void Configure(IApplicationBuilder app, IConfiguration configuration)
        {
            if (bool.Parse(configuration["Authentication:JwtBearer:IsEnabled"]))
            {
                app.UseJwtBearerAuthentication(CreateJwtBearerAuthenticationOptions(app));
            }

            var externalAuthConfiguration = app.ApplicationServices.GetRequiredService<ExternalAuthConfiguration>();

            if (bool.Parse(configuration["Authentication:Facebook:IsEnabled"]))
            {
                externalAuthConfiguration.Providers.Add(
                    new ExternalLoginProviderInfo(
                        FacebookAuthProviderApi.Name,
                        configuration["Authentication:Facebook:AppId"],
                        configuration["Authentication:Facebook:AppSecret"],
                        typeof(FacebookAuthProviderApi)
                    )
                );
            }

            if (bool.Parse(configuration["Authentication:Google:IsEnabled"]))
            {
                externalAuthConfiguration.Providers.Add(
                    new ExternalLoginProviderInfo(
                        GoogleAuthProviderApi.Name,
                        configuration["Authentication:Google:ClientId"],
                        configuration["Authentication:Google:ClientSecret"],
                        typeof(GoogleAuthProviderApi)
                    )
                );
            }
        }

        private static JwtBearerOptions CreateJwtBearerAuthenticationOptions(IApplicationBuilder app)
        {
            var tokenAuthConfig = app.ApplicationServices.GetRequiredService<TokenAuthConfiguration>();
            return new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = new TokenValidationParameters
                {
                    // The signing key must match!
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = tokenAuthConfig.SecurityKey,

                    // Validate the JWT Issuer (iss) claim
                    ValidateIssuer = true,
                    ValidIssuer = tokenAuthConfig.Issuer,

                    // Validate the JWT Audience (aud) claim
                    ValidateAudience = true,
                    ValidAudience = tokenAuthConfig.Audience,

                    // Validate the token expiry
                    ValidateLifetime = true,

                    // If you want to allow a certain amount of clock drift, set that here
                    ClockSkew = TimeSpan.Zero
                },

                Events = new JwtBearerEvents
                {
                    OnMessageReceived = QueryStringTokenResolver
                }
            };
        }

        /* This method is needed to authorize SignalR javascript client.
         * SignalR can not send authorization header. So, we are getting it from query string as an encrypted text. */
        private static Task QueryStringTokenResolver(MessageReceivedContext context)
        {
            if (!context.HttpContext.Request.Path.HasValue ||
                !context.HttpContext.Request.Path.Value.StartsWith("/signalr"))
            {
                //We are just looking for signalr clients
                return Task.CompletedTask;
            }

            var qsAuthToken = context.HttpContext.Request.Query["enc_auth_token"].FirstOrDefault();
            if (qsAuthToken == null)
            {
                //Cookie value does not matches to querystring value
                return Task.CompletedTask;
            }

            //Set auth token from cookie
            context.Token = SimpleStringCipher.Instance.Decrypt(qsAuthToken, AppConsts.DefaultPassPhrase);
            return Task.CompletedTask;
        }
    }
}
