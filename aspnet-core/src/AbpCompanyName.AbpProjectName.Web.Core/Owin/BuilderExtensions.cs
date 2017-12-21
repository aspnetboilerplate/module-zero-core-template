#if FEATURE_SIGNALR_OWIN
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Owin.Builder;
using Owin;

namespace AbpCompanyName.AbpProjectName.Owin
{
    /// <summary>
    /// This class (UseAppBuilder method) integrates OWIN pipeline to ASP.NET Core pipeline and
    /// allows us to use Owin based middlewares in ASP.NET Core applications.
    /// </summary>
    public static class BuilderExtensions
    {
        public static IApplicationBuilder UseAppBuilder(
            this IApplicationBuilder app,
            Action<IAppBuilder> configure)
        {
            app.UseOwin(addToPipeline =>
            {
                addToPipeline(next =>
                {
                    var appBuilder = new AppBuilder();
                    appBuilder.Properties["builder.DefaultApp"] = next;

                    configure(appBuilder);

                    return appBuilder.Build<Func<IDictionary<string, object>, Task>>();
                });
            });

            return app;
        }
    }
}
#endif
