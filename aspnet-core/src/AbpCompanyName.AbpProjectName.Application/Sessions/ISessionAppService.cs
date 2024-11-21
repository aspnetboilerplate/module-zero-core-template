using Abp.Application.Services;
using AbpCompanyName.AbpProjectName.Sessions.Dto;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.Sessions;

public interface ISessionAppService : IApplicationService
{
    Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
}
