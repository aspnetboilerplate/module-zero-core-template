using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.Authorization.Users;
using Abp.Dependency;
using Abp.Domain.Repositories;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AutoMapper;

namespace AbpCompanyName.AbpProjectName.Roles.Dto
{
    public class RoleMapProfile : Profile
    {
        public RoleMapProfile()
        {
            // Role and permission
            CreateMap<Permission, string>().ConvertUsing(r => r.Name);
            CreateMap<RolePermissionSetting, string>().ConvertUsing(r => r.Name);

            CreateMap<CreateRoleDto, Role>().ForMember(x => x.Permissions, opt => opt.Ignore());
           CreateMap<RoleDto, Role>().ForMember(x => x.Permissions, opt => opt.Ignore());

            IRepository<Role, int> repository = IocManager.Instance.Resolve<IRepository<Role, int>>();
            // User and role
            CreateMap<UserRole, string>().ConvertUsing((r) => {
                //TODO: Fix, this seems hacky
                Role role = repository.FirstOrDefault(r.RoleId);
                return role.DisplayName;
            });

            IocManager.Instance.Release(repository);
        }
    }
}
