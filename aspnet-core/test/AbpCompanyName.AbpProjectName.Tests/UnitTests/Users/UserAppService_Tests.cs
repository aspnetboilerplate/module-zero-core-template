using System.Threading.Tasks;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Tests.UnitTests.FakeServices;
using AbpCompanyName.AbpProjectName.Users;
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

        private UserAppService GetUserAppService(Role role)
        {
            var roleRepository = role.AsRepository<Role>();
            var userAppService = new UserAppService(null, null, null, roleRepository, null)
            {
                ObjectMapper = ObjectMapper
            };
            return userAppService;
        }
    }
}
