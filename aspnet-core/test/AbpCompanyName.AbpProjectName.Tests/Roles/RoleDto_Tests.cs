using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Abp.Authorization.Roles;

using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Roles.Dto;

using Xunit;
using Shouldly;

namespace AbpCompanyName.AbpProjectName.Tests.Roles
{
    public class RoleDto_Tests : AbpProjectNameDtoTestBase<RoleDto>
    {
        protected override RoleDto GetDto()
        {
            return new RoleDto
            {
                Id = 1,
                Name = "Role",
                DisplayName = "Role",
                Description = "Role Description",
                Permissions = new List<string> { "PermissionName" }
            };
        }

        #region Name

        [Fact]
        public async virtual Task Name_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.Name = null;

            //Act, Assert
            await Validate(roleDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.Name = String.Empty;

            //Act, Assert
            await Validate(roleDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.Name = new string('a', AbpRoleBase.MaxNameLength + 1);

            //Act, Assert
            await Validate(roleDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Spaces_In_Value_Should_Be_Valid()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.Name = "Role Name With Space";

            //Act, Assert
            await Validate(roleDto);
        }

        #endregion

        #region DisplayName

        [Fact]
        public async virtual Task DisplayName_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.DisplayName = null;

            //Act, Assert
            await Validate(roleDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task DisplayName_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.DisplayName = String.Empty;

            //Act, Assert
            await Validate(roleDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task DisplayName_With_Spaces_In_Value_Should_Be_Valid()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.DisplayName = "Role DisplayName With Space";

            //Act, Assert
            await Validate(roleDto);
        }

        [Fact]
        public async virtual Task DisplayName_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.DisplayName = new string('a', AbpRoleBase.MaxDisplayNameLength + 1); 

            //Act, Assert
            await Validate(roleDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion

        #region Description

        [Fact]
        public async virtual Task Description_With_Null_Value_Should_Be_Valid()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.Description = null;

            //Act, Assert
            await Validate(roleDto);
        }

        [Fact]
        public async virtual Task Description_With_Empty_Value_Should_Be_Valid()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.Description = String.Empty;

            //Act, Assert
            await Validate(roleDto);
        }

        [Fact]
        public async virtual Task Description_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            RoleDto roleDto = GetDto();
            roleDto.Description = new string('a', Role.MaxDescriptionLength + 1);

            //Act, Assert
            await Validate(roleDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion
    }
}
