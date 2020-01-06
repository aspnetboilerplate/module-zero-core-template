using Abp.AutoMapper;
using AbpCompanyName.AbpProjectName.Sessions.Dto;

namespace AbpCompanyName.AbpProjectName.Web.Views.Shared.Components.TenantChange
{
    [AutoMapFrom(typeof(GetCurrentLoginInformationsOutput))]
    public class TenantChangeViewModel
    {
        public TenantLoginInfoDto Tenant { get; set; }
    }
}
