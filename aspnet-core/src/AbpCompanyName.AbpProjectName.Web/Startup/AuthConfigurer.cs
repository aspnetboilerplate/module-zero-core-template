using System;
using System.Text;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
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
            app.UseCookieAuthentication(new CookieAuthenticationOptions()
            {
                AuthenticationScheme = AuthenticationScheme,
                LoginPath = new PathString("/Account/Login/"),
                AccessDeniedPath = new PathString("/Error/E403"),
                AutomaticAuthenticate = true,
                AutomaticChallenge = true
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
                ConfigureJwtBearerAuthentication(app, configuration);
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

        private static void ConfigureJwtBearerAuthentication(IApplicationBuilder app, IConfiguration configuration)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["Authentication:JwtBearer:SecurityKey"]));

            //Adding bearer authentication
            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = new TokenValidationParameters
                {
                    // The signing key must match!
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = securityKey,

                    // Validate the JWT Issuer (iss) claim
                    ValidateIssuer = true,
                    ValidIssuer = configuration["Authentication:JwtBearer:Issuer"],

                    // Validate the JWT Audience (aud) claim
                    ValidateAudience = true,
                    ValidAudience = configuration["Authentication:JwtBearer:Audience"],

                    // Validate the token expiry
                    ValidateLifetime = true,

                    // If you want to allow a certain amount of clock drift, set that here
                    ClockSkew = TimeSpan.Zero
                }
            });

            // Adding JWT generation endpoint
            //app.UseMiddleware<TokenProviderMiddleware>(Options.Create(new TokenProviderOptions
            //{
            //    Path = "/jwt-token/authenticate",
            //    Issuer = configuration["Authentication:JwtBearer:Issuer"],
            //    Audience = configuration["Authentication:JwtBearer:Audience"],
            //    SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256),
            //    Expiration = TimeSpan.FromDays(1)
            //}));
        }
    }
}
