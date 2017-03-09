using Abp.Configuration;
using Abp.Domain.Uow;
using Abp.Zero.AspNetCore;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.Users;
using Microsoft.AspNetCore.Http;

namespace AbpCompanyName.AbpProjectName.Web.Identity
{
    public class SignInManager : AbpSignInManager<Tenant, Role, User>
    {
        public SignInManager(
            UserManager userManager,
            IHttpContextAccessor contextAccessor,
            ISettingManager settingManager,
            IUnitOfWorkManager unitOfWorkManager,
            IAbpZeroAspNetCoreConfiguration configuration)
            : base(
                  userManager,
                  contextAccessor,
                  settingManager,
                  unitOfWorkManager,
                  configuration)
        {
        }
    }
}
