using System;
using System.Threading.Tasks;

using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.MultiTenancy.Dto;

using Shouldly;
using Xunit;

namespace AbpCompanyName.AbpProjectName.Tests.MultiTenancy
{
    public class TenantDto_Tests : AbpProjectNameDtoTestBase<TenantDto>
    {
        protected override TenantDto GetDto()
        {
            return new TenantDto
            {
                Name = "Updated Tenant",
                TenancyName = "UpdatedTenant",
                IsActive = true
            };
        }

        #region Name

        [Fact]
        public async virtual Task Name_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            TenantDto tenantDto = GetDto();
            tenantDto.Name = null;

            //Act, Assert
            await Validate(tenantDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            TenantDto tenantDto = GetDto();
            tenantDto.Name = String.Empty;

            //Act, Assert
            await Validate(tenantDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            TenantDto tenantDto = GetDto();
            tenantDto.Name = new string('a', Tenant.MaxNameLength + 1);

            //Act, Assert
            await Validate(tenantDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task Name_With_Spaces_In_Value_Should_Be_Valid()
        {
            //Arrange
            TenantDto tenantDto = GetDto();
            tenantDto.Name = "Role Name With Space";

            //Act, Assert
            await Validate(tenantDto);
        }

        #endregion

        #region TenancyName

        [Fact]
        public async virtual Task TenancyName_With_Null_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            TenantDto tenantDto = GetDto();
            tenantDto.TenancyName = null;

            //Act, Assert
            await Validate(tenantDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task TenancyName_With_Empty_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            TenantDto tenantDto = GetDto();
            tenantDto.TenancyName = String.Empty;

            //Act, Assert
            await Validate(tenantDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task TenancyName_With_Over_MaxLength_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            TenantDto tenantDto = GetDto();
            tenantDto.TenancyName = new string('a', Tenant.MaxNameLength + 1);

            //Act, Assert
            await Validate(tenantDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task TenancyName_With_Spaces_In_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            TenantDto tenantDto = GetDto();
            tenantDto.TenancyName = "Role Name With Space";

            //Act, Assert
            await Validate(tenantDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        [Fact]
        public async virtual Task TenancyName_With_Punctuation_In_Value_Should_Cause_Validation_Failure()
        {
            //Arrange
            TenantDto tenantDto = GetDto();
            tenantDto.TenancyName = "Role!Name\"With£Punctuation%^&*()_+=";

            //Act, Assert
            await Validate(tenantDto)
                .ShouldThrowAsync<ShouldAssertException>();
        }

        #endregion
    }
}
