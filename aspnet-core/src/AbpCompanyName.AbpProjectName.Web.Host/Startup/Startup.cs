using System;
using Abp.AspNetCore;
using Abp.Castle.Logging.Log4Net;
using Abp.Owin;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.Owin;
using Castle.Facilities.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Owin;


namespace AbpCompanyName.AbpProjectName.Web.Host.Startup
{
    public class Startup
    {
        private const string DefaultCorsPolicyName = "localhost";

        private readonly IConfigurationRoot _appConfiguration;

        public Startup(IHostingEnvironment env)
        {
            _appConfiguration = env.GetAppConfiguration();
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            //MVC
            services.AddMvc(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory(DefaultCorsPolicyName));
            });

            //Configure CORS for angular2 UI
            services.AddCors(options =>
            {
                options.AddPolicy(DefaultCorsPolicyName, p =>
                {
                    p.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
                });
            });

            //Swagger - Enable this line and the related lines in Configure method to enable swagger UI
            services.AddSwaggerGen();
            
            //Configure Abp and Dependency Injection
            return services.AddAbp<AbpProjectNameWebHostModule>(options =>
            {
                //Configure Log4Net logging
                options.IocManager.IocContainer.AddFacility<LoggingFacility>(
                    f => f.UseAbpLog4Net().WithConfig("log4net.config")
                );
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseAbp(); //Initializes ABP framework.

            app.UseCors(DefaultCorsPolicyName); //Enable CORS!

            AuthConfigurer.Configure(app, _appConfiguration);

            app.UseStaticFiles();

            //Integrate to OWIN
            app.UseAppBuilder(ConfigureOwinServices);

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
            app.UseSwaggerUi(); //URL: /swagger/ui
        }

        private static void ConfigureOwinServices(IAppBuilder app)
        {
            app.Properties["host.AppName"] = "AbpZeroTemplate";

            app.UseAbp();

            //app.Map("/signalr", map =>
            //{
            //    map.UseCors(CorsOptions.AllowAll);
            //    var hubConfiguration = new HubConfiguration
            //    {
            //        EnableJSONP = true
            //    };
            //    map.RunSignalR(hubConfiguration);
            //});
        }
    }
}
