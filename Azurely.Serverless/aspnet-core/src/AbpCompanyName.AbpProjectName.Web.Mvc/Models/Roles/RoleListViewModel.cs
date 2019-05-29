using System.Collections.Generic;
using Azurely.Serverless.Roles.Dto;

namespace Azurely.Serverless.Web.Models.Roles
{
    public class RoleListViewModel
    {
        public IReadOnlyList<RoleListDto> Roles { get; set; }

        public IReadOnlyList<PermissionDto> Permissions { get; set; }
    }
}

