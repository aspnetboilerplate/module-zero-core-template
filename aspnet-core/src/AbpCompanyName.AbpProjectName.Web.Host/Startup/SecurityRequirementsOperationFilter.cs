using System.Collections.Generic;
using System.Linq;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using Abp.Authorization;

namespace AbpCompanyName.AbpProjectName.Web.Host.Startup
{
    public class SecurityRequirementsOperationFilter : IOperationFilter
    {
        public void Apply(Operation operation, OperationFilterContext context)
        {
            var controllerAbpAuthorizeAttrs = context.ApiDescription.ControllerAttributes()
                .OfType<AbpAuthorizeAttribute>();

            var actionAbpAuthorizeAtrrs = context.ApiDescription.ActionAttributes()
                .OfType<AbpAuthorizeAttribute>();

            if (controllerAbpAuthorizeAttrs.Any() || actionAbpAuthorizeAtrrs.Any())
            {
                operation.Responses.Add("401", new Response { Description = "Unauthorized" });
                operation.Responses.Add("403", new Response { Description = "Forbidden" });

                var permissions = controllerAbpAuthorizeAttrs.Union(actionAbpAuthorizeAtrrs)
                    .SelectMany(p => p.Permissions)
                    .Distinct();

                operation.Security = new List<IDictionary<string, IEnumerable<string>>>
                {
                    new Dictionary<string, IEnumerable<string>>
                    {
                        { "bearerAuth", permissions }
                    }
                };
            }
        }
    }
}
