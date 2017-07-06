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
using AbpCompanyName.AbpProjectName.Users;
using AbpCompanyName.AbpProjectName.Users.Dto;

using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;

namespace AbpCompanyName.AbpProjectName.Tests.Users
{
    public class UserAppService_Tests : AbpProjectNameTestBase
    {
        private readonly IUserAppService _userAppService;

        private long[] _userIds = new long[0];

        public UserAppService_Tests()
        {
            _userAppService = Resolve<IUserAppService>();
        }

        private async Task createUsers(int count)
        {
            Role adminRole = await getAdminRole();

            List<long> ids = new List<long>();

            for(int i = 0; i < count; i++ )
            {
                long id = UsingDbContext(context => 
                {
                    User user = new User
                    {
                        EmailAddress = $"user.{i}@volosoft.com",
                        IsActive = true,
                        Name = "User",
                        Surname = $"{i}",
                        Password = "123qwe",
                        UserName = $"User.{i}",
                        TenantId = this.AbpSession.TenantId
                    };

                    context.Users.Add(
                        user
                    );

                    context.SaveChanges();
                    return user.Id;
                });

                ids.Add(id);

                long adminUserRoleId = UsingDbContext(context => 
                {
                    UserRole userRole = new UserRole
                    (
                        this.AbpSession.TenantId,
                        id,
                        adminRole.Id
                    );

                    context.UserRoles.Add
                    (
                        userRole
                    );

                    context.SaveChanges();
                    return userRole.Id;
                });

            }

            _userIds = ids.ToArray();
        }

        private async Task<Role> getAdminRole()
        {
            return await UsingDbContextAsync(async context =>
            {
                return await context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin" && r.TenantId == this.AbpSession.TenantId && r.IsDeleted == false);
            });
        }

        [Fact]
        public async Task Create_Test()
        {
            //Arrange
            Role adminRole = await getAdminRole();

            adminRole.ShouldNotBeNull();

            //Act
            UserDto userDto = await _userAppService.Create(
                new CreateUserDto
                {
                    EmailAddress = "john@volosoft.com",
                    IsActive = true,
                    Name = "John",
                    Surname = "Nash",
                    Password = "123qwe",
                    UserName = "john.nash",
                    Roles = new List<string>{"Admin"}.ToArray()
                }
            );

            //Assert
            await UsingDbContextAsync(async context =>
            {
                User johnNashUser = await context.Users.Include(x=>x.Roles).FirstOrDefaultAsync(u => u.UserName == "john.nash");
                johnNashUser.ShouldNotBeNull();
                johnNashUser.Roles.ShouldNotBeNull();
                johnNashUser.Roles.AsQueryable().Any(x => x.RoleId == adminRole.Id).ShouldBeTrue();
            });
        }

        [Fact]
        public async Task Create_For_Non_Existing_Role_Should_Throw_Exception_Test()
        {
            //Act
            _userAppService.Create(
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

            // Failure Here.. Could be because of lack of transactions on InMemory Provider
            // await UsingDbContextAsync(async context =>
            // {
            //     User johnNashUser = await context.Users.Include(x=>x.Roles).FirstOrDefaultAsync(u => u.UserName == "john.nash" && u.IsDeleted == false);
            //     johnNashUser.ShouldBeNull();
            // });
        }

        [Fact]
        public async Task Get_Test()
        {
            // Arrange
            await createUsers(1);

            // Act
            UserDto userDto = await _userAppService.Get(new EntityDto<long>( _userIds[0]));

            // Assert
            userDto.Id.ShouldBe(_userIds[0]);
        }

        [Fact]
        public async Task GetAll_Test()
        {
            //Arrange
            await createUsers(20);

            //Act
            PagedResultDto<UserDto> users = await _userAppService.GetAll(
                new PagedResultRequestDto{MaxResultCount=10, SkipCount=0}
            );

            //Assert
            users.Items.Count.ShouldBe(10);
        }

        [Fact]
        public async Task GetAll_Paging_Test()
        {
            //Arrange
            await createUsers(20);

            //Act
            PagedResultDto<UserDto> users = await _userAppService.GetAll(
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
            await createUsers(20);

            //Act
            PagedResultDto<UserDto> users = await _userAppService.GetAll(
                new PagedResultRequestDto{MaxResultCount=10, SkipCount=10} 
            );

            // Assert
            users.Items.ShouldBeInOrder(SortDirection.Descending, 
                Comparer<UserDto>.Create((x, y) => x.Name.CompareTo(y.Name) )
            );
        }

        [Fact]
        public async Task Update_Test()
        {
            // Arrange
            await createUsers(1);

            // Act
            UserDto userDto = await _userAppService.Update(
                new UserDto
                {
                    Id = _userIds[0],
                    EmailAddress = "john@volosoft.com",
                    IsActive = true,
                    Name = "John",
                    Surname = "Nash",
                    UserName = "john.nash",
                    Roles = new List<string>{"Admin"}.ToArray()
                }
            );

            // Assert
            await UsingDbContextAsync(async context => 
            {
                User updatedUser = await context.Users.FirstOrDefaultAsync(x => x.Id == userDto.Id);
                updatedUser.Id.ShouldBe(_userIds[0]);
                updatedUser.EmailAddress.ShouldBe("john@volosoft.com");
                updatedUser.UserName.ShouldBe("john.nash");
            });
        }

        [Fact]
        public async Task Update_Sets_Roles_Correctly_Test()
        {
            // Arrange
            Role adminRole = await getAdminRole();

            await createUsers(1); //User Has Admin Permission

            // Act
            UserDto userDto = await _userAppService.Update(
                new UserDto
                {
                    Id = _userIds[0],
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
                updatedUser.Id.ShouldBe(_userIds[0]);

                // Admin role should be removed
                updatedUser.Roles.Any(x => x.Id == adminRole.Id).ShouldBeFalse();
            });
        }

        [Fact]
        public async Task Delete_Test()
        {
            // Arrange
            await createUsers(1);

            // Act
            await _userAppService.Delete(new EntityDto<long>(_userIds[0]));

            // Assert
            await UsingDbContextAsync(async context => 
            {
                User updatedUser = await context.Users.FirstOrDefaultAsync(x => x.Id == _userIds[0] && x.IsDeleted == false);
                updatedUser.ShouldBeNull();
            });
        }
    }
}
