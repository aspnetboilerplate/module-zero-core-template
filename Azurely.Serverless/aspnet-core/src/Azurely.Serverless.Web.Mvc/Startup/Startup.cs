using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Castle.Facilities.Logging;
using Abp.AspNetCore;
using Abp.Castle.Logging.Log4Net;
using Azurely.Serverless.Authentication.JwtBearer;
using Azurely.Serverless.Configuration;
using Azurely.Serverless.Identity;
using Azurely.Serverless.Web.Resources;
using Abp.AspNetCore.SignalR.Hubs;
using Microsoft.ApplicationInsights.Extensibility;
using System.Configuration;
using System.Linq;
using log4net.Appender;
using log4net.Layout;

namespace Azurely.Serverless.Web.Startup
{
    public class Startup
    {
        private readonly IConfigurationRoot _appConfiguration;

        public Startup(IHostingEnvironment env)
        {
            _appConfiguration = env.GetAppConfiguration();
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // MVC
            services.AddMvc(
                options => options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute())
            );

            IdentityRegistrar.Register(services);
            AuthConfigurer.Configure(services, _appConfiguration);

            services.AddScoped<IWebResourceManager, WebResourceManager>();

            services.AddSignalR();

            // Configure Abp and Dependency Injection
            return services.AddAbp<ServerlessWebMvcModule>(
                // Configure Log4Net logging
                options => options.IocManager.IocContainer.AddFacility<LoggingFacility>(
                    f => f.UseAbpLog4Net().WithConfig("log4net.config")
                )
            );
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseAbp(); // Initializes ABP framework.

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseJwtTokenMiddleware();

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

            //setting up logging repository (file vs application insights).
            var _repository = log4net.LogManager.GetAllRepositories().First();
            var _root = ((log4net.Repository.Hierarchy.Hierarchy)log4net.LogManager.GetRepository(_repository.Name)).Root;
            var _attachable = _root as log4net.Core.IAppenderAttachable;
            if (_attachable != null)
            {
                bool _IsApplicationInsightsEnabled = Convert.ToBoolean(_appConfiguration.GetSection("AppSettings").GetSection("IsApplicationInsightsEnabled").Value);
                if (!_IsApplicationInsightsEnabled) {
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

