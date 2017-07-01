using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.MultiTenancy.Dto;

namespace AbpCompanyName.AbpProjectName.MultiTenancy
{
    public interface ITenantAppService : IApplicationService, IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
