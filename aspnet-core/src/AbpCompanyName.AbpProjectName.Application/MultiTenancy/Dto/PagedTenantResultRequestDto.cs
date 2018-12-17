using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.MultiTenancy.Dto
{
    public class PagedTenantResultRequestDto : PagedResultRequestDto
    {
        public string TenancyName { get; set; }
        public string Name { get; set; }
        public bool? IsActive { get; set; }
    }
}

