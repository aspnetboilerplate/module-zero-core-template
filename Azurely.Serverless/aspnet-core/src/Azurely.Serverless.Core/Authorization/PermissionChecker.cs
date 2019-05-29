using Abp.Authorization;
using Azurely.Serverless.Authorization.Roles;
using Azurely.Serverless.Authorization.Users;

namespace Azurely.Serverless.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

