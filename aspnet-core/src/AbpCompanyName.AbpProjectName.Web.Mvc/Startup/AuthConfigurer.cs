using System;
using System.Text;
using AbpCompanyName.AbpProjectName.Authentication.JwtBearer;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AbpCompanyName.AbpProjectName.Web.Startup
{
    public static class AuthConfigurer
    {
        public const string AuthenticationScheme = "AbpProjectNameAuthSchema";
        public const string ExternalAuthenticationScheme = AuthenticationScheme + "." + DefaultAuthenticationTypes.ExternalCookie;
        /// <summary>
        /// Configures the specified application.
        /// </summary>
        /// <param name="app">The application.</param>
        /// <param name="configuration">The configuration.</param>
        public static void Configure(IApplicationBuilder app, IConfiguration configuration)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = false,
                AuthenticationScheme = ExternalAuthenticationScheme,
                CookieName = ExternalAuthenticationScheme
            });

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationScheme = AuthenticationScheme,
                LoginPath = new PathString("/Account/Login/"),
                AccessDeniedPath = new PathString("/Error/E403"),
                AutomaticAuthenticate = true,
                AutomaticChallenge = true
            });

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = false,
                AuthenticationScheme = DefaultAuthenticationTypes.TwoFactorCookie,
                ExpireTimeSpan = TimeSpan.FromMinutes(5),
                CookieName = DefaultAuthenticationTypes.TwoFactorCookie
            });

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = false,
                AuthenticationScheme = DefaultAuthenticationTypes.TwoFactorRememberBrowserCookie,
                CookieName = DefaultAuthenticationTypes.TwoFactorRememberBrowserCookie
            });

            if (bool.Parse(configuration["Authentication:Google:IsEnabled"]))
            {
                app.UseGoogleAuthentication(CreateGoogleAuthOptions(configuration));
            }

            if (bool.Parse(configuration["Authentication:Facebook:IsEnabled"]))
            {
                app.UseFacebookAuthentication(CreateFacebookAuthOptions(configuration));
            }

            if (bool.Parse(configuration["Authentication:JwtBearer:IsEnabled"]))
            {
                app.UseJwtBearerAuthentication(CreateJwtBearerAuthenticationOptions(app));
            }
        }

        private static GoogleOptions CreateGoogleAuthOptions(IConfiguration configuration)
        {
            return new GoogleOptions
            {
                SignInScheme = AuthenticationScheme,
                ClientId = configuration["Authentication:Google:ClientId"],
                ClientSecret = configuration["Authentication:Google:ClientSecret"]
            };
        }

        private static FacebookOptions CreateFacebookAuthOptions(IConfiguration configuration)
        {
            var options = new FacebookOptions
            {
                AppId = configuration["Authentication:Facebook:AppId"],
                AppSecret = configuration["Authentication:Facebook:AppSecret"],
                SignInScheme = AuthenticationScheme
            };

            options.Scope.Add("email");
            options.Scope.Add("public_profile");

            return options;
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
