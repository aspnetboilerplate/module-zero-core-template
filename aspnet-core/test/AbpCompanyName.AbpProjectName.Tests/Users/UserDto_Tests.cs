﻿using System;
using System.Threading.Tasks;

using Abp.Authorization.Users;
using AbpCompanyName.AbpProjectName.Users.Dto;

using Shouldly;
using Xunit;

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

        #region Name

        [Fact]
        public async Task Name_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.Name = null;

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Name_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.Name = String.Empty;

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Name_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.Name = new string('a', AbpUserBase.MaxNameLength + 1);

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion

        #region Surname

        [Fact]
        public async Task Surname_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.Surname = null;

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Surname_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.Surname = string.Empty;

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task Surname_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.Surname = new string('a', AbpUserBase.MaxSurnameLength + 1);

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion

        #region EmailAddress

        [Fact]
        public async Task EmailAddress_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.EmailAddress = null;

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task EmailAddress_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.EmailAddress = String.Empty;

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task EmailAddress_With_Invalid_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.EmailAddress = "InvalidEmailAddress";

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion

        #region Username

        [Fact]
        public async Task EmailAddress_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.EmailAddress = new string('a', AbpUserBase.MaxEmailAddressLength) + "@volosoft.com";

            //Act, Assert
            await Validate(userDto)
               .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task UserName_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.UserName = null;

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task UserName_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.UserName = String.Empty;

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async Task UserName_With_Over_MaxLength_Should_Cause_Validation_Failure()
        {
            //Arrange
            UserDto userDto = GetDto();
            userDto.UserName = new string('a', AbpUserBase.MaxUserNameLength + 1);

            //Act, Assert
            await Validate(userDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion
    }
}
