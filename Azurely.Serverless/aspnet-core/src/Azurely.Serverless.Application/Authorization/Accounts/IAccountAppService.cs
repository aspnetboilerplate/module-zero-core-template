using System.Threading.Tasks;
using Abp.Application.Services;
using Azurely.Serverless.Authorization.Accounts.Dto;

namespace Azurely.Serverless.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}

