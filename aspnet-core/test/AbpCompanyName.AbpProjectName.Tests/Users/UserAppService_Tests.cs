using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Abp;
using Abp.Application.Services.Dto;

using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Users;
using AbpCompanyName.AbpProjectName.Users.Dto;

using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;

namespace AbpCompanyName.AbpProjectName.Tests.Users
{
    public class UserAppService_Tests : AbpProjectNameAsyncServiceTestBase<User, UserDto, long, UserAppService, CreateUserDto, UserDto>
    {
        protected override async Task<User> CreateEntity(int entityNumer)
        {
            return new User
            {
                EmailAddress = $"user.{entityNumer.ToString("000.#")}@volosoft.com",
                IsActive = true,
                Name = "User",
                Surname = $"{entityNumer.ToString("000.#")}",
                Password = "123qwe",
                UserName = $"User.{entityNumer.ToString("000.#")}",
                TenantId = AbpSession.TenantId
            };
        }

        protected override CreateUserDto GetCreateDto()
        {
            return new CreateUserDto
            {
                EmailAddress = "new.user@volosoft.com",
                IsActive = true,
                Name = "New",
                Surname = "User",
                Password = "123qwe",
                UserName = "New.User",
                Roles = new String[] { "Admin" }
            };
        }

        protected override UserDto GetUpdateDto(long key)
        {
            return new UserDto
            {
                Id = key,
                EmailAddress = "updated.user@volosoft.com",
                IsActive = true,
                Name = "Updated",
                Surname = "User",
                UserName = "Updated.User",
                Roles = new String[] { "Admin" }
            };
        }
        
        private async Task<Role> GetRole(string name)
        {
            return await UsingDbContextAsync(async context =>
            {
                return await context.Roles.FirstOrDefaultAsync(r => r.Name == name && r.TenantId == this.AbpSession.TenantId && r.IsDeleted == false);
            });
        }

        public async override Task CreateChecks(AbpProjectNameDbContext context, CreateUserDto createEntity)
        {
            Role adminRole = await GetRole("Admin");
            User user = await context.Users.Include(x => x.Roles).FirstOrDefaultAsync(e => e.EmailAddress == createEntity.EmailAddress);

            adminRole.ShouldNotBeNull();
            user.ShouldNotBeNull();

            user.Roles.Any(x => x.RoleId == adminRole.Id);
        }

        [Fact]
        public async Task Create_For_Non_Existing_Role_Should_Throw_Exception_Test()
        {
            //Arrange
            CreateUserDto dto = GetCreateDto();
            dto.Roles = new string[] { "NONEXISTANTROLE" };

            //Act, Assert
            await AppService.Create(
                dto
            ).ShouldThrowAsync(typeof(AbpException));

            // Failure Here, should just delete this code. Lack of transactions on InMemory Provider
            //await UsingDbContextAsync(async context =>
            //{
            //    User johnNashUser = await context.Users.Include(x => x.Roles).FirstOrDefaultAsync(u => u.UserName == "john.nash" && u.IsDeleted == false);
            //    johnNashUser.ShouldBeNull();
            //});
        }

        [Fact]
        public async Task Create_With_Invalid_UserName_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.UserName = "invalid username";

            //Act, Assert
            await CheckForValidationErrors(
                async () => await AppService.Create(createDto)
            ).ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task GetAll_Check_Sorting_Test()
        {
            //Arrange
            await Create(20);

            //Act
            PagedResultDto<UserDto> users = await AppService.GetAll(
                new PagedResultRequestDto { MaxResultCount = 10, SkipCount = 10 }
            );

            //Assert
            users.Items.ShouldBeInOrder(SortDirection.Descending,
                Comparer<UserDto>.Create((x, y) => x.Name.CompareTo(y.Name))
            );
        }

        [Fact]
        public async Task Update_Sets_Roles_Correctly_Test()
        {
            //Arrange
            Role adminRole = await GetRole("admin");

            await Create(1); //User Has Admin Permission

            UserDto user = GetUpdateDto(keys[0]);
            user.Roles = new List<string> { }.ToArray(); //Remove Admin Role

            // Act
            UserDto userDto = await base.CheckForValidationErrors(
                async () => await AppService.Update(
                    user
                )
            );

            // Assert
            await UsingDbContextAsync(async context =>
            {
                User updatedUser = await context.Users.Include(x => x.Roles).FirstOrDefaultAsync(x => x.Id == userDto.Id);
                updatedUser.Id.ShouldBe(keys[0]);

                // Admin role should be removed
                updatedUser.Roles.Any(x => x.Id == adminRole.Id).ShouldBeFalse();
            });
        }

        public override async Task DeleteChecks(AbpProjectNameDbContext context, long key)
        {
            User user = await context.Users.FirstOrDefaultAsync(
                e => e.Id == key
            );

            user.ShouldNotBeNull();
            user.IsDeleted.ShouldBeTrue();
        }
    }
}
