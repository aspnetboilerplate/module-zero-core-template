using System.Collections.Generic;
using Azurely.Serverless.Roles.Dto;
using Azurely.Serverless.Users.Dto;

namespace Azurely.Serverless.Web.Models.Users
{
    public class UserListViewModel
    {
        public IReadOnlyList<UserDto> Users { get; set; }

        public IReadOnlyList<RoleDto> Roles { get; set; }
    }
}

