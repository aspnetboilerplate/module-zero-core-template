using System.Threading.Tasks;
using Abp.Application.Services;
using AbpCompanyName.AbpProjectName.Sessions.Dto;

namespace AbpCompanyName.AbpProjectName.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
