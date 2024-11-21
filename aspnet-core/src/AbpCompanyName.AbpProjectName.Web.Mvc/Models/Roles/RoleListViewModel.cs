using AbpCompanyName.AbpProjectName.Roles.Dto;
using System.Collections.Generic;

namespace AbpCompanyName.AbpProjectName.Web.Models.Roles;

public class RoleListViewModel
{
    public IReadOnlyList<PermissionDto> Permissions { get; set; }
}
