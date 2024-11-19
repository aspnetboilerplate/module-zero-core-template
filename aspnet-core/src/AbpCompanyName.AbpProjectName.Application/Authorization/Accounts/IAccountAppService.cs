using Abp.Application.Services;
using AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts;

public interface IAccountAppService : IApplicationService
{
    Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

    Task<RegisterOutput> Register(RegisterInput input);
}
