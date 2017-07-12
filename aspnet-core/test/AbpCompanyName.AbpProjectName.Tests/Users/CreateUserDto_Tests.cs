using System;
using System.Collections.Generic;
using System.Text;

using Abp.TestBase;
using System.Threading.Tasks;
using Xunit;
using AbpCompanyName.AbpProjectName.Users.Dto;
using System.ComponentModel.DataAnnotations;
using Shouldly;
using Abp.Authorization.Users;

namespace AbpCompanyName.AbpProjectName.Tests.Users
{
    public class CreateUserDto_Tests : AbpProjectNameDtoTestBase<CreateUserDto>
    {
        protected override CreateUserDto GetDto()
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

        [Fact]
        public async Task Name_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.Name = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Name_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.Name = String.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Name_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.Name = new string('a', AbpUserBase.MaxNameLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Surname_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.Surname = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Surname_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.Surname = string.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Surname_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.Surname = new string('a', AbpUserBase.MaxSurnameLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task EmailAddress_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.EmailAddress = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task EmailAddress_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.EmailAddress = String.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task EmailAddress_With_Invalid_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.EmailAddress = "InvalidEmailAddress";

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task UserName_With_Over_MaxLength_EmailAddress_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.EmailAddress = new string('a', AbpUserBase.MaxEmailAddressLength + 1);

            //Act, Assert
            await Validate(createDto)
               .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task UserName_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.UserName = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task UserName_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.UserName = String.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task UserName_Over_MaxLength_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.UserName = new string('a', AbpUserBase.MaxUserNameLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Password_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.Password = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Password_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.Password = String.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }


        [Fact]
        public async Task Password_With_Over_MaxLength_EmailAddress_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateUserDto createDto = GetDto();
            createDto.Password = new string('a', AbpUserBase.MaxPlainPasswordLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }
    }
}
