using System.Collections.Generic;
using AbpCompanyName.AbpProjectName.Roles.Dto;

namespace AbpCompanyName.AbpProjectName.Web.Models.Roles
{
    public class RoleListViewModel
    {
        public IReadOnlyList<RoleListDto> Roles { get; set; }

        public IReadOnlyList<PermissionDto> Permissions { get; set; }
    }
}
