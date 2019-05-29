using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Azurely.Serverless.MultiTenancy.Dto;

namespace Azurely.Serverless.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}


