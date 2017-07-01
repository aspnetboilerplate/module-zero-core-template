using System.Reflection;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.Roles.Dto;
using AbpCompanyName.AbpProjectName.Users.Dto;
using AutoMapper;

namespace AbpCompanyName.AbpProjectName
{
    [DependsOn(
        typeof(AbpProjectNameCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class AbpProjectNameApplicationModule : AbpModule
    {

        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<AbpProjectNameAuthorizationProvider>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpProjectNameApplicationModule).GetAssembly());

            // TODO: Is there somewhere else to store these, with the dto classes
            Configuration.Modules.AbpAutoMapper().Configurators.Add(cfg =>
            {
                // Role and permission
                cfg.CreateMap<Permission, string>().ConvertUsing(r => r.Name);
                cfg.CreateMap<RolePermissionSetting, string>().ConvertUsing(r => r.Name);    

                cfg.CreateMap<CreateRoleDto, Role>().ForMember(x => x.Permissions, opt => opt.Ignore());
                cfg.CreateMap<RoleDto, Role>().ForMember(x => x.Permissions, opt => opt.Ignore());

                IRepository<Role, int> repository = IocManager.Resolve<IRepository<Role, int>>();
                // User and role
                cfg.CreateMap<UserRole, string>().ConvertUsing(  (r) =>  {
                    //TODO: Fix, this seems hacky
                    Role role = repository.FirstOrDefault(r.RoleId);
                    return role.DisplayName;
                });

                IocManager.Release(repository);
                
                cfg.CreateMap<UserDto, User>();
                cfg.CreateMap<UserDto, User>().ForMember(x => x.Roles, opt => opt.Ignore());

                cfg.CreateMap<CreateUserDto, User>();
                cfg.CreateMap<CreateUserDto, User>().ForMember(x => x.Roles, opt => opt.Ignore());
            });
        }
    }
}