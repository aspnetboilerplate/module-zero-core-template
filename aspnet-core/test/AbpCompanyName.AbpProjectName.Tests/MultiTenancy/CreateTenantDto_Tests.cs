using System;
using System.Threading.Tasks;

using Abp.Authorization.Users;
using Abp.MultiTenancy;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.MultiTenancy.Dto;

using Shouldly;
using Xunit;

namespace AbpCompanyName.AbpProjectName.Tests.MultiTenancy
{
    public class CreateTenantDto_Tests : AbpProjectNameDtoTestBase<CreateTenantDto>
    {
        protected override CreateTenantDto GetDto()
        {
            return new CreateTenantDto
            {
                Name = "New Tenant",
                TenancyName = "NewTenant",
                ConnectionString = "",
                AdminEmailAddress = "new.tenant@volosoft.com",
                IsActive = true
            };
        }

        #region Name

        [Fact]
        public async virtual Task Name_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.Name = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.Name = String.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.Name = new string('a', Tenant.MaxNameLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Spaces_In_Value_Should_Be_Valid()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.Name = "Role Name With Space";

            //Act, Assert
            await Validate(createDto);
        }

        #endregion

        #region TenancyName

        [Fact]
        public async virtual Task TenancyName_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.TenancyName = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task TenancyName_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.TenancyName = String.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task TenancyName_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.TenancyName = new string('a', Tenant.MaxNameLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task TenancyName_With_Spaces_In_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.TenancyName = "Role Name With Space";

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task TenancyName_With_Punctuation_In_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.TenancyName = "Role!Name\"With£Punctuation%^&*()_+=";

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion

        #region AdminEmailAddress

        [Fact]
        public async virtual Task AdminEmailAddress_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.AdminEmailAddress = null;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task AdminEmailAddress_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.AdminEmailAddress = String.Empty;

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task AdminEmailAddress_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.AdminEmailAddress = new string('a', AbpUserBase.MaxEmailAddressLength + 1) + "@volosoft.com";

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion

        #region ConnectionString

        [Fact]
        public async virtual Task ConnectionString_With_Null_Value_Should_Be_Valid()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.ConnectionString = null;

            //Act, Assert
            await Validate(createDto);
        }

        [Fact]
        public async virtual Task ConnectionString_With_Empty_Value_Should_Be_Valid()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.ConnectionString = String.Empty;

            //Act, Assert
            await Validate(createDto);
        }

        [Fact]
        public async virtual Task ConnectionString_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            CreateTenantDto createDto = GetDto();
            createDto.ConnectionString = new string('a', AbpTenantBase.MaxConnectionStringLength + 1);

            //Act, Assert
            await Validate(createDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion
    }
}
