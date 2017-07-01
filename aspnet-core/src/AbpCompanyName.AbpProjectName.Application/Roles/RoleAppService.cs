using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;

using System.Linq;
using System.Linq.Dynamic.Core; 
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.ObjectMapping;

using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Roles.Dto;
using AbpCompanyName.AbpProjectName.Users.Dto;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Abp.IdentityFramework;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using Abp.Domain.Uow;
using AbpCompanyName.AbpProjectName.Authorization;
using Abp.UI;

namespace AbpCompanyName.AbpProjectName.Roles
{
    public class RoleAppService : AsyncCrudAppService<Role, RoleDto, int, PagedResultRequestDto, CreateRoleDto, RoleDto>, IRoleAppService, IAsyncCrudAppService<RoleDto, int, PagedResultRequestDto, CreateRoleDto,RoleDto>
    {
        private RoleManager roleManager;
        private UserManager userManager;

        public RoleAppService(IRepository<Role> _service, RoleManager roleManager, UserManager userManager): base(_service)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;

            CreatePermissionName 
            = GetAllPermissionName 
            = GetPermissionName 
            = UpdatePermissionName
            = DeletePermissionName
            = PermissionNames.Pages_Roles;
        }

        protected override IQueryable<Role> CreateFilteredQuery(PagedResultRequestDto input)
        {
             return Repository.GetAllIncluding(x=>x.Permissions);
        }

        protected override async Task<Role> GetEntityByIdAsync(int id)
        {
            return await CreateFilteredQuery(null)
                            .Where(x=>x.Id == id)
                            .FirstOrDefaultAsync();
        }

        // sorting has to be re-applied after paging, .Take resets the sorting
        protected override IQueryable<Role> ApplyPaging(IQueryable<Role> query, PagedResultRequestDto input)
        {
            //Try to use paging if available
            var pagedInput = input as IPagedResultRequest;
            if (pagedInput != null)
            {
                // Sort again after paging // .take resets the orderby
                query = query.PageBy(pagedInput);
                query = ApplySorting(query, input);
                return query;
            }

            //Try to limit query result if available
            var limitedInput = input as ILimitedResultRequest;
            if (limitedInput != null)
            {
                query = query.Take(limitedInput.MaxResultCount);
                query = ApplySorting(query, input);
                return query;
            }

            //No paging
            return query;
        }

        [UnitOfWork]
        public override async Task<RoleDto> Create(CreateRoleDto input)
        {
            CheckCreatePermission();

            Role role = ObjectMapper.Map<Role>(input);
            role.SetNormalizedName();

            IdentityResult result = await this.roleManager.CreateAsync(role);
            CheckErrors(result);
            
            var grantedPermissions = PermissionManager
                .GetAllPermissions()
                .Where(p => input.Permissions.Contains(p.Name))
                .ToList();

            await roleManager.SetGrantedPermissionsAsync(role, grantedPermissions);

            return MapToEntityDto(role);
        }

        [UnitOfWork]
        public override async Task<RoleDto> Update(RoleDto input)
        {
            CheckUpdatePermission();

            Role role = await roleManager.GetRoleByIdAsync(input.Id);

            // Update role
            Role r = ObjectMapper.Map<RoleDto, Role>(input, role);

            CheckErrors(await this.roleManager.UpdateAsync(role));
            
            var grantedPermissions = PermissionManager
                .GetAllPermissions()
                .Where(p => input.Permissions.Contains(p.Name))
                .ToList();

            await this.roleManager.SetGrantedPermissionsAsync(role, grantedPermissions);

            // should reload entity fresh from db after changes
            return MapToEntityDto(role);
        }

        [UnitOfWork]
        public async override Task Delete(EntityDto<int> input)
        {
            CheckDeletePermission();

            Role role = await this.roleManager.FindByIdAsync(input.Id.ToString());
            if(role.IsStatic)
            {
                throw new UserFriendlyException("CannotDeleteAStaticRole");
            }
            
            IList<User> users = await this.userManager.GetUsersInRoleAsync(role.NormalizedName);

            foreach(User user in users)
            {

                CheckErrors(await this.userManager.RemoveFromRoleAsync(user, role.NormalizedName));
            }

            IdentityResult result = await this.roleManager.DeleteAsync(role);


            CheckErrors(result);
        }

        public async Task<ListResultDto<PermissionDto>> GetAllPermissions()
        {
            IReadOnlyList<Permission> permissions = await Task<IReadOnlyList<Permission>>.Run( () => PermissionManager.GetAllPermissions() );
            
            var mapped = ObjectMapper.Map<List<PermissionDto>>(permissions);
            return new ListResultDto<PermissionDto>(
                ObjectMapper.Map<List<PermissionDto>>(permissions)
            );
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}