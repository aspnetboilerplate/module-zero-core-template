using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Abp.Application.Services.Dto;

using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Roles;
using AbpCompanyName.AbpProjectName.Roles.Dto;

using Microsoft.EntityFrameworkCore;

using Shouldly;
using Xunit;

namespace AbpCompanyName.AbpProjectName.Tests.Roles
{
    public class RoleAppService_Tests : AbpProjectNameAsyncServiceTestBase<Role, RoleDto, int, RoleAppService, CreateRoleDto, RoleDto>
    {
        protected override async Task<Role> CreateEntity(int number)
        {
            return new Role
            {
                DisplayName = $"Role{number.ToString("000.#")}",
                Description= $"Role{number.ToString("000.#")}",
                Name = $"Role{number.ToString("000.#")}",
                TenantId = AbpSession.TenantId
            };
        }

        protected override CreateRoleDto GetCreateDto()
        {
            return new CreateRoleDto
            {
                Name = "New Role",
                DisplayName = "New Role",
                Description = "New Role Description",
                Permissions = new List<string>{PermissionNames.Pages_Users, PermissionNames.Pages_Roles}
            };
        }

        protected override RoleDto GetUpdateDto(int key)
        {
            return new RoleDto
            {
                Id = key,
                Name = "Updated Role",
                DisplayName = "Updated Role",
                Description = "Updated Role Description",
                Permissions = new List<string> { }
            };
        }

        public override async Task UpdateChecks(AbpProjectNameDbContext context, RoleDto updateDto)
        {
            updateDto.Name.ShouldBe("Updated Role");
            updateDto.DisplayName.ShouldBe("Updated Role");
            updateDto.Description.ShouldBe("Updated Role Description");

            Role role = await context.Roles.FirstOrDefaultAsync(x => x.Id == updateDto.Id);
            role.ShouldNotBeNull();
        }

        [Fact]
        public async virtual Task Create_Sets_Correct_Permissions_Test()
        {
            //Arrange
            CreateRoleDto createDto = GetCreateDto();

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

        [Fact]
        public async virtual Task GetAll_Sorting_Test()
        {
            //Arrange
            await Create(20);

            //Act
            PagedResultDto<RoleDto> roles = await AppService.GetAll(
                new PagedResultRequestDto{MaxResultCount=10, SkipCount=10}
            );

            //Assert
            roles.Items.ShouldBeInOrder(SortDirection.Ascending, 
                Comparer<RoleDto>.Create((x, y) => x.Name.CompareTo(y.Name) )
            );

            // admin is first role
            roles.Items[0].Name.ShouldBe("Role009");
            roles.Items[9].Name.ShouldBe("Role018");
        }
    }
}