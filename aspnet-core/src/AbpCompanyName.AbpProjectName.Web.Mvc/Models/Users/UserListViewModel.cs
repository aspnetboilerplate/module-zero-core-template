using System.Collections.Generic;
using AbpCompanyName.AbpProjectName.Roles.Dto;

namespace AbpCompanyName.AbpProjectName.Web.Models.Users
{
    public class UserListViewModel
    {
        public IReadOnlyList<RoleDto> Roles { get; set; }
    }
}
