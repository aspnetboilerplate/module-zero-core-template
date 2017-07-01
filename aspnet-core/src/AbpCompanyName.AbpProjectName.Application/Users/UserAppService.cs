using System.Collections.Generic;
using System.Threading.Tasks;

using Abp.Domain.Uow;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;

using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Users.Dto;

using Microsoft.AspNetCore.Identity;

using System.Linq;
using System.Linq.Dynamic;
using System.Linq.Expressions;

using Microsoft.EntityFrameworkCore;
using Abp.Linq.Extensions;
using Abp.IdentityFramework;

namespace AbpCompanyName.AbpProjectName.Users
{
    public class UserAppService  : AsyncCrudAppService<User, UserDto, long, PagedResultRequestDto, CreateUserDto, UserDto>, IUserAppService, IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, UserDto>
    {
        private UserManager userManager;

        public UserAppService(IRepository<User, long> _service, UserManager userManager): base(_service)
        {
            this.userManager = userManager;

            CreatePermissionName 
            = GetAllPermissionName 
            = GetPermissionName 
            = UpdatePermissionName
            = DeletePermissionName
            = PermissionNames.Pages_Users;
        }

        protected override IQueryable<User> CreateFilteredQuery(PagedResultRequestDto input)
        {
             return Repository.GetAllIncluding(x=>x.Roles).OrderByDescending(x=>x.Id);
        }

        protected override async Task<User> GetEntityByIdAsync(long id)
        {
            return await CreateFilteredQuery(null)
                            .Where(x=>x.Id == id)
                            .FirstOrDefaultAsync();
        }
        protected override User MapToEntity(CreateUserDto createInput)
        {
            User user = ObjectMapper.Map<User>(createInput);
            user.SetNormalizedNames();
            
            return user;
        }

        protected override void MapToEntity(UserDto input, User user)
        {
            ObjectMapper.Map(input, user);
            user.SetNormalizedNames();
        }

        protected override IQueryable<User> ApplyPaging(IQueryable<User> query, PagedResultRequestDto input)
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
        public async override Task<UserDto> Create(CreateUserDto input)
        {
            CheckCreatePermission();

            User user = ObjectMapper.Map<User>(input); 
            CheckErrors(await userManager.CreateAsync(user));
            CheckErrors(await userManager.SetRoles(user, input.Roles));

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(user);
        }

        [UnitOfWork]
        public async override Task<UserDto> Update(UserDto input)
        {
            CheckUpdatePermission();

            User user = await userManager.GetUserByIdAsync(input.Id);

            MapToEntity(input, user);

            CheckErrors(await this.userManager.UpdateAsync(user));
            CheckErrors(await userManager.SetRoles(user, input.Roles));
            
            // get the user again after updating the roles
            return await Get(input);
        }

        [UnitOfWork]
        public async override Task Delete(EntityDto<long> input)
        {
            User user = await userManager.GetUserByIdAsync(input.Id);
            await userManager.DeleteAsync(user);
		}
        
        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}