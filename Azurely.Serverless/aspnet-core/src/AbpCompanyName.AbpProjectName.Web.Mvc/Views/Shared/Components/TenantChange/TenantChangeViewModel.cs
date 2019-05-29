using Abp.AutoMapper;
using Azurely.Serverless.Sessions.Dto;

namespace Azurely.Serverless.Web.Views.Shared.Components.TenantChange
{
    [AutoMapFrom(typeof(GetCurrentLoginInformationsOutput))]
    public class TenantChangeViewModel
    {
        public TenantLoginInfoDto Tenant { get; set; }
    }
}

