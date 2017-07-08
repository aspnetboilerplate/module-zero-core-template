using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using Abp;
using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Users;
using AbpCompanyName.AbpProjectName.Users.Dto;

using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.Tests.Users
{
    public class UserAppService_Tests : AbpProjectNameAsyncServiceTestBase<User, UserDto, long, UserAppService, CreateUserDto, UserDto>
    {
        protected override async Task<User> createEntity(int entityNumer)
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

        protected override CreateUserDto getCreateDto()
        {
            return new CreateUserDto
            {
                EmailAddress = "new.user@volosoft.com",
                IsActive = true,
                Name = "New",
                Surname = "User",
                Password = "123qwe",
                UserName = "New.User"
            };
        }

        public async override Task CreateChecks(AbpProjectNameDbContext context)
        {
            Role adminRole = await getRole("Admin");

            User adminUser = await context.Users.Include(x => x.Roles).FirstOrDefaultAsync(e => e.UserName == "Admin");
            adminUser.ShouldNotBeNull();

            adminUser.Roles.Any(x => x.RoleId == adminRole.Id).ShouldBeTrue();
        }

        private async Task<Role> getRole(string name)
        {
            return await UsingDbContextAsync(async context =>
            {
                return await context.Roles.FirstOrDefaultAsync(r => r.Name == name && r.TenantId == this.AbpSession.TenantId && r.IsDeleted == false);
            });
        }
        
        [Fact]
        public async Task Create_For_Non_Existing_Role_Should_Throw_Exception_Test()
        {
            //Act
            AppService.Create(
                new CreateUserDto
                {
                    EmailAddress = "john@volosoft.com",
                    IsActive = true,
                    Name = "John",
                    Surname = "Nash",
                    Password = "123qwe",
                    UserName = "john.nash",
                    Roles = new List<string>{"NonExistantRole"}.ToArray()
                }
            ).ShouldThrow(typeof(AbpException));

            // Failure Here.. Lack of transactions on InMemory Provider
            //await UsingDbContextAsync(async context =>
            //{
            //    User johnNashUser = await context.Users.Include(x => x.Roles).FirstOrDefaultAsync(u => u.UserName == "john.nash" && u.IsDeleted == false);
            //    johnNashUser.ShouldBeNull();
            //});
        }

        [Fact]
        public async Task GetAll_Paging_Test()
        {
            //Arrange
            await create(20);

            //Act
            PagedResultDto<UserDto> users = await AppService.GetAll(
                new PagedResultRequestDto{MaxResultCount=10, SkipCount=10} 
            );

            //Assert
            users.Items.Count.ShouldBe(10);
            users.TotalCount.ShouldBeGreaterThan(20); // Including SystemUsers
        }

        [Fact]
        public async Task GetAll_Check_Sorting_Test()
        {
            //Arrange
            await create(20);

            //Act
            PagedResultDto<UserDto> users = await AppService.GetAll(
                new PagedResultRequestDto{MaxResultCount=10, SkipCount=10} 
            );

            // Assert
            users.Items.ShouldBeInOrder(SortDirection.Descending, 
                Comparer<UserDto>.Create((x, y) => x.Name.CompareTo(y.Name) )
            );
        }

        [Fact]
        public async Task Update_Sets_Roles_Correctly_Test()
        {
            // Arrange
            Role adminRole = await getRole("admin");

            await create(1); //User Has Admin Permission

            // Act
            UserDto userDto = await AppService.Update(
                new UserDto
                {
                    Id = keys[0],
                    EmailAddress = "john@volosoft.com",
                    IsActive = true,
                    Name = "John",
                    Surname = "Nash",
                    UserName = "john.nash",
                    Roles = new List<string> { }.ToArray()
                }
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
    }
}
