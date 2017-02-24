using System;
using AbpCompanyName.AbpProjectName.Authentication.External;
using AbpCompanyName.AbpProjectName.Authentication.External.Facebook;
using AbpCompanyName.AbpProjectName.Authentication.External.Google;
using AbpCompanyName.AbpProjectName.Authentication.JwtBearer;
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
                }
            };
        }
    }
}
