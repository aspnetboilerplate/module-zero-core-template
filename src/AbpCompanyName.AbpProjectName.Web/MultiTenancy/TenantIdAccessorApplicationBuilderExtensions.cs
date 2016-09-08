using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace AbpCompanyName.AbpProjectName.Web.MultiTenancy
{
    public static class TenantIdAccessorApplicationBuilderExtensions
    {
        /// <summary>
        /// This simple middleware executes <see cref="TenantIdAccessor.SetCurrentTenantId"/> method
        /// in every request.
        /// </summary>
        public static void UseTenantIdAccessorInitialization(this IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                context.RequestServices
                    .GetRequiredService<TenantIdAccessor>()
                    .SetCurrentTenantId();

                await next.Invoke();
            });
        }
    }
}
