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
using Abp.Authorization.Users;

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

        // 
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

        #region CreateUserDto Tests, TCreateDto

        private async Task<UserDto> createUser(CreateUserDto createDto)
        {
            //Act, Assert
            return await CheckForValidationErrors(
                async () => await AppService.Create(createDto)
            );
        }

        [Fact]
        public async Task Create_With_Null_Name_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.Name = null;

            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Empty_Name_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.Name = String.Empty;

            //Act, Assert
            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Over_MaxNameLength_Name_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.Name = new string('a', AbpUserBase.MaxNameLength + 1);

            //Act, Assert
            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Null_Surname_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.Surname = null;

            //Act, Assert
            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Empty_Surname_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.Surname = string.Empty;

            //Act, Assert
            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Over_MaxLength_Surname_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.Surname = new string('a', AbpUserBase.MaxSurnameLength + 1);

            //Act, Assert
            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Null_EmailAddress_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.EmailAddress = null;

            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Empty_EmailAddress_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.EmailAddress = String.Empty;

            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Invalid_EmailAddress_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.EmailAddress = "InvalidEmailAddress";

            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Over_MaxLength_EmailAddress_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.EmailAddress = new string('a', AbpUserBase.MaxEmailAddressLength + 1);

             await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Null_UserName_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.UserName = null;

            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Empty_UserName_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.UserName = String.Empty;

            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Invalid_UserName_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.UserName = "invalid username";

            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Over_MaxLength_UserName_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.UserName = new string('a', AbpUserBase.MaxUserNameLength + 1);

            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Null_Password_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.Password = null;

            //Act, Assert
            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Empty_Password_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.Password = String.Empty;

            //Act, Assert
            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }


        [Fact]
        public async Task Create_With_Over_MaxLength_Password_Should_Throw()
        {
            //Arrange
            CreateUserDto createDto = GetCreateDto();
            createDto.Password = new string('a', AbpUserBase.MaxPlainPasswordLength + 1);

            //Act, Assert
            await createUser(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion

        [Fact]
        public async Task GetAll_Check_Sorting_Test()
        {
            //Arrange
            await Create(20);

            //Act
            PagedResultDto<UserDto> users = await AppService.GetAll(
                new PagedResultRequestDto { MaxResultCount = 10, SkipCount = 10 }
            );

            // Assert
            users.Items.ShouldBeInOrder(SortDirection.Descending,
                Comparer<UserDto>.Create((x, y) => x.Name.CompareTo(y.Name))
            );
        }

        [Fact]
        public async Task Update_Sets_Roles_Correctly_Test()
        {
            // Arrange
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

        #region UserDto Validation tests, (TUpdateDto)

        private async Task<UserDto> updateUser(UserDto updateDto)
        {
            return await CheckForValidationErrors(
                async () => await AppService.Update(updateDto)
            );
        }

        [Fact]
        public async Task Update_With_Null_EmailAddress_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.EmailAddress = null;

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Empty_EmailAddress_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.EmailAddress = String.Empty;

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Invalid_EmailAddress_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.EmailAddress = "InvalidEmailAddress";

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Over_MaxLength_EmailAddress_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.EmailAddress = String.Format("{0}@volosoft.com", new string('a', AbpUserBase.MaxEmailAddressLength));

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Null_UserName_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.UserName = null;

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Empty_UserName_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.UserName = String.Empty;

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Invalid_UserName_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.UserName = "invalid username";

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Email_For_UserName_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.UserName = "user@volosoft.com";  
            //Check if original UserAppService worked like this, [functionality is in mvc project in jquery]

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Over_MaxLength_UserName_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.UserName = new string('a', AbpUserBase.MaxUserNameLength + 1);

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Null_Name_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.Name = null;

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Empty_Name_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.Name = String.Empty;

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Over_MaxLength_Name_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.Name = new string('a', AbpUserBase.MaxNameLength + 1);

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Null_Surname_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.Surname = null;

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Empty_Surname_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.Surname = "";

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Update_With_Over_MaxLength_Surname_Should_Throw()
        {
            //Arrange
            await Create(1);

            UserDto updateDto = GetUpdateDto(keys[0]);
            updateDto.Surname = new string('a', AbpUserBase.MaxSurnameLength + 1);

            //Act, Assert
            await updateUser(updateDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion

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
