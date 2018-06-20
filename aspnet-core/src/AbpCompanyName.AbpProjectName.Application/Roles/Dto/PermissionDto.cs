using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Authorization;

namespace AbpCompanyName.AbpProjectName.Roles.Dto
{
    public class PermissionDto
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }
    }
}
