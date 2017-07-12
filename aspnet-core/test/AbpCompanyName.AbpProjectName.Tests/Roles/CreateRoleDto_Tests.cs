using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Abp.Authorization.Roles;

using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Roles.Dto;
using AbpCompanyName.AbpProjectName.Authorization.Roles;

using Xunit;
using Shouldly;

namespace AbpCompanyName.AbpProjectName.Tests.Roles
{
    public class CreateRoleDto_Tests : AbpProjectNameDtoTestBase<CreateRoleDto>
    {
        protected override CreateRoleDto GetDto()
        {
            return new CreateRoleDto
            {
                Name = "New Role",
                DisplayName = "New Role",
                Description = "New Role Description",
                Permissions = new List<string> { PermissionNames.Pages_Users, PermissionNames.Pages_Roles }
            };
        }

        #region Name

        [Fact]
        public async virtual Task Name_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.Name = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.Name = String.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.Name = new string('a', AbpRoleBase.MaxNameLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Spaces_In_Value_Should_Be_Valid()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.Name = "Role Name With Space";

            //Act, Assert
            await Validate(createDto);
        }

        #endregion

        #region DisplayName

        [Fact]
        public async virtual Task DisplayName_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.DisplayName = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task DisplayName_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.DisplayName = String.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task DisplayName_With_Spaces_In_Value_Should_Be_Valid()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.DisplayName = "Role DisplayName With Space";

            //Act, Assert
            await Validate(createDto);
        }

        [Fact]
        public async virtual Task DisplayName_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.DisplayName = new string('a', AbpRoleBase.MaxDisplayNameLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion

        #region Description

        [Fact]
        public async virtual Task Description_With_Null_Value_Should_Be_Valid()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.Description = null;

            //Act, Assert
            await Validate(createDto);
        }

        [Fact]
        public async virtual Task Description_With_Empty_Value_Should_Be_Valid()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.Description = String.Empty;

            //Act, Assert
            await Validate(createDto);
        }

        [Fact]
        public async virtual Task Description_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateRoleDto createDto = GetDto();
            createDto.Description = new string('a', Role.MaxDescriptionLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion
    }
}
