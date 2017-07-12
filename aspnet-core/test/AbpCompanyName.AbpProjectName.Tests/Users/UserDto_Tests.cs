using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text;

using Abp.TestBase;
using AbpCompanyName.AbpProjectName.Users.Dto;
using System.Threading.Tasks;
using Xunit;

using Shouldly;
using Abp.Authorization.Users;
using Xunit.Abstractions;

namespace AbpCompanyName.AbpProjectName.Tests.Users
{
    public class UserDto_Tests :  AbpProjectNameDtoTestBase<UserDto>
    {
        protected override UserDto GetDto()
        {
            return new UserDto
            {
                Id = 1,
                EmailAddress = "new.user@volosoft.com",
                IsActive = true,
                Name = "New",
                Surname = "User",
                UserName = "New.User",
                Roles = new String[] { "Admin" }
            };
        }

        [Fact]
        public async Task Create_With_Null_Name_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.Name = null;

            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Empty_Name_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.Name = String.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Over_MaxLength_Name_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.Name = new string('a', AbpUserBase.MaxNameLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Null_Surname_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.Surname = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Empty_Surname_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.Surname = string.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Over_MaxLength_Surname_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.Surname = new string('a', AbpUserBase.MaxSurnameLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Null_EmailAddress_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.EmailAddress = null;

            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Empty_EmailAddress_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.EmailAddress = String.Empty;

            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Invalid_EmailAddress_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.EmailAddress = "InvalidEmailAddress";

            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Over_MaxLength_EmailAddress_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.EmailAddress = new string('a', AbpUserBase.MaxEmailAddressLength + 1);

            await Validate(createDto)
               .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Null_UserName_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.UserName = null;

            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Empty_UserName_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.UserName = String.Empty;

            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Create_With_Over_MaxLength_UserName_Should_Throw()
        {
            //Arrange
            UserDto createDto = GetDto();
            createDto.UserName = new string('a', AbpUserBase.MaxUserNameLength + 1);

            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }
    }
}
