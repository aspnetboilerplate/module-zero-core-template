using Abp;
using Abp.AspNetCore;
using Abp.AspNetCore.Configuration;
using Abp.AspNetCore.SignalR;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.Configuration;
using AbpCompanyName.AbpProjectName.Authentication.JwtBearer;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Linq;
using System.Text;

namespace AbpCompanyName.AbpProjectName
{
    [DependsOn(
         typeof(AbpProjectNameApplicationModule),
         typeof(AbpProjectNameEntityFrameworkModule),
         typeof(AbpAspNetCoreModule)
        , typeof(AbpAspNetCoreSignalRModule)
     )]
    public class AbpProjectNameWebCoreModule : AbpModule
    {
        // Part of the signing key the startup template ships with. Projects downloaded from
        // aspnetboilerplate.com get a random key instead, but a project created from the
        // repository may still contain it.
        private const string TemplateSecurityKeyMarker = "C421AAEE0D114E9C";

        // Pass phrases of AbpProjectNameConsts.DefaultPassPhrase that are public: the debug-build
        // value and the release-build placeholder, which is replaced when a project is created.
        private static readonly string[] TemplatePassPhrases = { "gsKxGZ012HLL3MI5", "{{DEFAULT_PASS_PHRASE_HERE}}" };

        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AbpProjectNameWebCoreModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                AbpProjectNameConsts.ConnectionStringName
            );

            // Use database for language management
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            Configuration.Modules.AbpAspNetCore()
                 .CreateControllersForAppServices(
                     typeof(AbpProjectNameApplicationModule).GetAssembly()
                 );

            EnsurePassPhraseIsNotTemplateDefault();
            ConfigureTokenAuth();
        }

        // SimpleStringCipher encrypts the SignalR access token, tenant connection strings and
        // encrypted settings with this pass phrase, so a production deployment refuses to start
        // with a public one.
        private void EnsurePassPhraseIsNotTemplateDefault()
        {
            if (!TemplatePassPhrases.Contains(AbpProjectNameConsts.DefaultPassPhrase))
            {
                return;
            }

            const string message =
                "AbpProjectNameConsts.DefaultPassPhrase is a default value of the startup template. " +
                "Replace it with a long, random value that is unique to this project. Values already " +
                "encrypted with the old pass phrase (tenant connection strings, encrypted settings) " +
                "must be encrypted again with the new one.";

            if (_env.IsProduction())
            {
                throw new AbpInitializationException(message);
            }

            Logger.Warn(message);
        }

        private void ConfigureTokenAuth()
        {
            var securityKey = _appConfiguration["Authentication:JwtBearer:SecurityKey"];
            EnsureSecurityKeyIsNotTemplateDefault(securityKey);

            IocManager.Register<TokenAuthConfiguration>();
            var tokenAuthConfig = IocManager.Resolve<TokenAuthConfiguration>();

            tokenAuthConfig.SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(securityKey));
            tokenAuthConfig.Issuer = _appConfiguration["Authentication:JwtBearer:Issuer"];
            tokenAuthConfig.Audience = _appConfiguration["Authentication:JwtBearer:Audience"];
            tokenAuthConfig.SigningCredentials = new SigningCredentials(tokenAuthConfig.SecurityKey, SecurityAlgorithms.HmacSha256);
            tokenAuthConfig.Expiration = TimeSpan.FromDays(1);
        }

        // Anyone who knows the project name can forge tokens signed with the template key,
        // so a production deployment refuses to start with it.
        private void EnsureSecurityKeyIsNotTemplateDefault(string securityKey)
        {
            if (!bool.Parse(_appConfiguration["Authentication:JwtBearer:IsEnabled"]) ||
                securityKey == null ||
                !securityKey.Contains(TemplateSecurityKeyMarker))
            {
                return;
            }

            const string message =
                "Authentication:JwtBearer:SecurityKey still contains the default key of the startup template. " +
                "Replace it with a long, random value that is unique to this deployment.";

            if (_env.IsProduction())
            {
                throw new AbpInitializationException(message);
            }

            Logger.Warn(message);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpProjectNameWebCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(AbpProjectNameWebCoreModule).Assembly);
        }
    }
}
