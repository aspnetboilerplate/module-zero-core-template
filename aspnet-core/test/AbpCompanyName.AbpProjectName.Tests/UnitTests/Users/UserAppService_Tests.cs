using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Tests.UnitTests.FakeServices;
using AbpCompanyName.AbpProjectName.Users;
using NSubstitute;
using Shouldly;
using Xunit;

namespace AbpCompanyName.AbpProjectName.Tests.UnitTests.Users
{
    public class UserAppService_Tests : AbpProjectNameUnitTestBase
    {
        [Fact]
        public async Task GivenRoleExists_WhenGetRoles_ThenItIsReturned()
        {
            // Arrange
            var role = new Role(29, "John Nash");
            var userAppService = GetUserAppService(role);

            // Act
            var listResultDto = await userAppService.GetRoles();

            // Assert
            var item = listResultDto.Items.ShouldHaveSingleItem();
            item.DisplayName.ShouldBe("John Nash");
        }

        [Fact]
        public async Task GivenNoRoleExists_WhenGetRoles_ThenNothingIsReturned()
        {
            // Arrange
            var userAppService = GetUserAppService(null);

            // Act
            var listResultDto = await userAppService.GetRoles();

            // Assert
            listResultDto.Items.ShouldBeEmpty();
        }

        [Fact]
        public async Task GivenUser5Exists_WhenDeleteUser5_ThenItIsDeleted()
        {
            // Arrange
            var user = new User {Id = 5};
            var userRepository = user.AsRepository<User, long>();
            var userAppService = GetUserAppService(null, userRepository);

            // Act
            await userAppService.Delete(new EntityDto<long> { Id = 5 });

            // Assert
            userRepository.Count().ShouldBe(0);
        }

        [Fact]
        public async Task GivenUser5Exists_WhenDeleteUser6_ThenItIsNotDeleted()
        {
            // Arrange
            var user = new User { Id = 5 };
            var userRepository = user.AsRepository<User, long>();
            var userAppService = GetUserAppService(null, userRepository);

            // Act
            userRepository.GetAll().Count().ShouldBe(1);
            await userAppService.Delete(new EntityDto<long> { Id = 6 });

            // Assert
            userRepository.Count().ShouldBe(1);
        }

        private UserAppService GetUserAppService(Role role, User user = null)
        {
            var roleRepository = role.AsRepository<Role>();
            var userRepository = user.AsRepository<User, long>();
            return GetUserAppService(roleRepository, userRepository);
        }

        private UserAppService GetUserAppService(IRepository<Role> roleRepository, IRepository<User, long> userRepository)
        {
            // todo: extract an interface for UserManager and use it in UserAppService to simplify mocking and remove all the null args
            var store = Substitute.For<UserStore>(null, null, null, null, null, null, null, null);
            var userManager = Substitute.For<UserManager>(null, store, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
            // forward calls to UserManager.GetUserByIdAsync() and DeleteAsync() on into the IRepository
            userManager.GetUserByIdAsync(Arg.Any<long>()).Returns(callInfo => userRepository.FirstOrDefaultAsync(user => user.Id == callInfo.Arg<long>()));
            userManager.When(async i => await i.DeleteAsync(Arg.Any<User>())).Do(i => userRepository.DeleteAsync(i.Arg<User>()));
            var userAppService = new UserAppService(userRepository, userManager, null, roleRepository, null)
            {
                ObjectMapper = ObjectMapper
            };
            return userAppService;
        }
    }
}
