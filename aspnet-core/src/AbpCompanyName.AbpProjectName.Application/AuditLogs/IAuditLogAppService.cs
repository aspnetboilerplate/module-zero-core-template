using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.AuditLogs.Dto;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.AuditLogs
{
    public interface IAuditLogAppService : IApplicationService
    {
        Task<PagedResultDto<AuditLogDto>> GetAllAsync(PagedAuditLogResultRequestDto input);

    }
}
