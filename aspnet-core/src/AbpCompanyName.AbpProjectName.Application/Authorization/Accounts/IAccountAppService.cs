using System.Threading.Tasks;
using Abp.Application.Services;
using AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
