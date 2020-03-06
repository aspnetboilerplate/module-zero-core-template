using Abp.Application.Services.Dto;
using System;

namespace AbpCompanyName.AbpProjectName.AuditLogs.Dto
{
    //custom PagedAuditLogResultRequestDto
    public class PagedAuditLogResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
