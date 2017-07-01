using System.ComponentModel.DataAnnotations;
using Abp.Auditing;
using Abp.Authorization.Users;
using Abp.AutoMapper;

using AbpCompanyName.AbpProjectName.Authorization.Users;

namespace AbpCompanyName.AbpProjectName.Users.Dto
{
    [AutoMapTo(typeof(User))]
    public class CreateUserDto
    {
        [Required]
        [StringLength(AbpUserBase.MaxUserNameLength)]
        public string UserName { get; set; }

        [Required]
        [StringLength(User.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(User.MaxSurnameLength)]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }

        public bool IsActive { get; set; }

        public string[] Roles { get; set; }

        [Required]
        [StringLength(User.MaxPlainPasswordLength)]
        [DisableAuditing]
        public string Password { get; set; }

        [Required]
        [StringLength(User.MaxPlainPasswordLength)]
        [DisableAuditing]
        public string ConfirmPassword { get; set; }
    }
}