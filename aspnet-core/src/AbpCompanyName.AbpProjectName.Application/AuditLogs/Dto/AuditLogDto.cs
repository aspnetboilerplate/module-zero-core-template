using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.AutoMapper;
using System;

namespace AbpCompanyName.AbpProjectName.AuditLogs.Dto
{
    [AutoMapFrom(typeof(AuditLog))]

    public class AuditLogDto : EntityDto<long>
    {
        public string UserName { get; set; }

        public string ServiceName { get; set; }
        public string MethodName { get; set; }
        public DateTime ExecutionTime { get; set; }
        public int ExecutionDuration { get; set; }
        public string ClientIpAddress { get; set; }
        public string ClientName { get; set; }
        public string BrowserInfo { get; set; }
    }
}
