using System;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Castle.Facilities.Logging;
using Swashbuckle.AspNetCore.Swagger;
using Abp.AspNetCore;
using Abp.Castle.Logging.Log4Net;
using Abp.Extensions;
using Azurely.Serverless.Configuration;
using Azurely.Serverless.Identity;

using Abp.AspNetCore.SignalR.Hubs;
using Microsoft.ApplicationInsights.Extensibility;
using System.Configuration;
using log4net.Appender;
using log4net.Layout;

namespace Azurely.Serverless.Web.Host.Startup
{
    public class Startup
    {
        private const string _defaultCorsPolicyName = "localhost";

        private readonly IConfigurationRoot _appConfiguration;

        public Startup(IHostingEnvironment env)
        {
            _appConfiguration = env.GetAppConfiguration();
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // MVC
            services.AddMvc(
                options => options.Filters.Add(new CorsAuthorizationFilterFactory(_defaultCorsPolicyName))
            );

            IdentityRegistrar.Register(services);
            AuthConfigurer.Configure(services, _appConfiguration);

            services.AddSignalR();

            // Configure CORS for angular2 UI
            services.AddCors(
                options => options.AddPolicy(
                    _defaultCorsPolicyName,
                    builder => builder
                        .WithOrigins(
                            // App:CorsOrigins in appsettings.json can contain more than one address separated by comma.
                            _appConfiguration["App:CorsOrigins"]
                                .Split(",", StringSplitOptions.RemoveEmptyEntries)
                                .Select(o => o.RemovePostFix("/"))
                                .ToArray()
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                )
            );

            // Swagger - Enable this line and the related lines in Configure method to enable swagger UI
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info { Title = "Serverless API", Version = "v1" });
                options.DocInclusionPredicate((docName, description) => true);

                // Define the BearerAuth scheme that's in use
                options.AddSecurityDefinition("bearerAuth", new ApiKeyScheme()
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
            });

            // Configure Abp and Dependency Injection
            return services.AddAbp<ServerlessWebHostModule>(
                // Configure Log4Net logging
                options => options.IocManager.IocContainer.AddFacility<LoggingFacility>(
                    f => f.UseAbpLog4Net().WithConfig("log4net.config")
                )
            );
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseAbp(options => { options.UseAbpRequestLocalization = false; }); // Initializes ABP framework.

            app.UseCors(_defaultCorsPolicyName); // Enable CORS!

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseAbpRequestLocalization();

            app.UseSignalR(routes =>
            {
                routes.MapHub<AbpCommonHub>("/signalr");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "defaultWithArea",
                    template: "{area}/{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();
            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint(_appConfiguration["App:ServerRootAddress"].EnsureEndsWith('/') + "swagger/v1/swagger.json", "Serverless API V1");
                options.IndexStream = () => Assembly.GetExecutingAssembly()
                    .GetManifestResourceStream("Azurely.Serverless.Web.Host.wwwroot.swagger.ui.index.html");
            }); // URL: /swagger

            //setting up logging repository (file vs application insights).
            var _repository = log4net.LogManager.GetAllRepositories().First();
            var _root = ((log4net.Repository.Hierarchy.Hierarchy)log4net.LogManager.GetRepository(_repository.Name)).Root;
            var _attachable = _root as log4net.Core.IAppenderAttachable;
            if (_attachable != null)
            {
                bool _IsApplicationInsightsEnabled = Convert.ToBoolean(_appConfiguration.GetSection("AppSettings").GetSection("IsApplicationInsightsEnabled").Value);
                if (!_IsApplicationInsightsEnabled)
                {
                    AddRollingFileAppender(_root);
                }
                else
                {
                    AddApplicationInsightsAppender(_root);
                }
            }
        }

        private void AddApplicationInsightsAppender(log4net.Repository.Hierarchy.Logger root)
        {
            TelemetryConfiguration.Active.InstrumentationKey = _appConfiguration.GetSection("AppSettings").GetSection("ApplicationInsightsInstrumentationKey").Value.ToString();
            Microsoft.ApplicationInsights.Log4NetAppender.ApplicationInsightsAppender _appender = new Microsoft.ApplicationInsights.Log4NetAppender.ApplicationInsightsAppender();
            PatternLayout layout = new PatternLayout();
            layout.ConversionPattern = "ASPNETCORE:%newline %date %-5level %logger – %message – %property %newline";
            layout.ActivateOptions();
            _appender.Layout = layout;
            _appender.ActivateOptions();
            root.AddAppender(_appender);
        }

        private void AddRollingFileAppender(log4net.Repository.Hierarchy.Logger root)
        {
            RollingFileAppender appender = new RollingFileAppender();
            appender.Name = "RollingFileAppender";
            appender.File = String.Format(@"Logs/Log4Net.log");
            appender.AppendToFile = true;
            appender.RollingStyle = RollingFileAppender.RollingMode.Date;
            appender.MaxSizeRollBackups = 10;
            appender.MaximumFileSize = "1000MB";
            PatternLayout layout = new PatternLayout();
            layout.ConversionPattern = "%newline %date %-5level %logger – %message – %property %newline";
            layout.ActivateOptions();
            appender.Layout = layout;
            appender.ActivateOptions();
            root.AddAppender(appender);
        }
    }
}

