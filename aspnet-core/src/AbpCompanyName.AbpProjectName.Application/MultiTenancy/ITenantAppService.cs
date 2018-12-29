using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.MultiTenancy.Dto;

namespace AbpCompanyName.AbpProjectName.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

