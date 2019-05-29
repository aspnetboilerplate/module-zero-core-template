using System.Threading.Tasks;
using Abp.Application.Services;
using Azurely.Serverless.Sessions.Dto;

namespace Azurely.Serverless.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

