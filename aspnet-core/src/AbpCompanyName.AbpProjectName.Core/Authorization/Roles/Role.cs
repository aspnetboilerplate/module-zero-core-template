using System.ComponentModel.DataAnnotations;
using Abp.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;

namespace AbpCompanyName.AbpProjectName.Authorization.Roles
{
    public class Role : AbpRole<User>
    {
        //Can add application specific role properties here
        public const int MaxDescriptionLength = 5000;

        public Role()
        {
        }

        public Role(int? tenantId, string displayName)
            : base(tenantId, displayName)
        {

        }

        public Role(int? tenantId, string name, string displayName)
            : base(tenantId, name, displayName)
        {

        }

        [MaxLength(Role.MaxDescriptionLength)]
        public string Description {get; set;}

        public bool IsActive {get; set;}
    }
}