using System.Collections.Generic;
using System.Threading.Tasks;

using System.Linq;
using System.Linq.Dynamic;

using Abp;
using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using Abp.Domain.Repositories;

using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Roles;
using AbpCompanyName.AbpProjectName.Users;
using AbpCompanyName.AbpProjectName.Users.Dto;

using Microsoft.EntityFrameworkCore;

using Shouldly;
using Xunit;
using AbpCompanyName.AbpProjectName.Roles.Dto;
using AbpCompanyName.AbpProjectName.Authorization;

namespace AbpCompanyName.AbpProjectName.Tests.Users
{
    public class RoleAppService_Tests : AbpProjectNameAsyncServiceTestBase<Role, RoleDto, int, RoleAppService, CreateRoleDto, RoleDto>
    {
        protected override Role create(int number)
        {
            return new Role
            {
                DisplayName = $"Role{number}",
                Description= $"Role{number}",
                Name = $"Role{number}",
                TenantId=AbpSession.TenantId
            };
        }

        protected override CreateRoleDto getCreateDto(int number)
        {
            return new CreateRoleDto
            {
                Name = "New Role",
                DisplayName = "New Role",
                Description = "New Role Description",
                Permissions = new List<string>{PermissionNames.Pages_Users, PermissionNames.Pages_Roles}
            };
        }

        [Fact]
        public async Task Create_Sets_Correct_Permissions_Test()
        {
            //Arrange
            CreateRoleDto createDto = getCreateDto(1);

            //Act
            RoleDto createdEntityDto = await AppService.Create(createDto);

            //Assert
            await UsingDbContextAsync(async context =>
            {
                Role savedEntity = await context.Roles.Include(x=>x.Permissions).FirstOrDefaultAsync(e => e.Id == createdEntityDto.Id);
                savedEntity.ShouldNotBeNull();

                savedEntity.Permissions.Any(x=>x.Name == PermissionNames.Pages_Users).ShouldBeTrue();
                savedEntity.Permissions.Any(x=>x.Name == PermissionNames.Pages_Roles).ShouldBeTrue();
            });
        }
    }
}