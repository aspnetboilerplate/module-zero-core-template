using AbpCompanyName.AbpProjectName.Roles.Dto;
using System.Collections.Generic;

namespace AbpCompanyName.AbpProjectName.Web.Models.Users;

public class UserListViewModel
{
    public IReadOnlyList<RoleDto> Roles { get; set; }
}
