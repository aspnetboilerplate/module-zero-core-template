using System.Threading.Tasks;

using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.MultiTenancy.Dto;

using Microsoft.EntityFrameworkCore;

using System.Linq;

using Shouldly;
using Xunit;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;

namespace AbpCompanyName.AbpProjectName.Tests.MultiTenancy
{
    public class TenantAppService_Tests : AbpProjectNameAsyncServiceTestBase<Tenant, TenantDto, int, TenantAppService, CreateTenantDto, TenantDto>
    {
        public TenantAppService_Tests()
        {
            LoginAsHost("admin");
        }
        
        protected override async Task<Tenant> createEntity(int number)
        {
            return new Tenant
            {
                TenancyName = $"Tenant{number.ToString("000.#")}",
                Name = $"Tenant{number.ToString("000.#")}",
                IsActive = true
            };
        }

        protected override CreateTenantDto getCreateDto()
        {
            return new CreateTenantDto
            {
                TenancyName = "newtenant",
                Name = "New Tenant",
                IsActive = true,
                AdminEmailAddress = "new.tenant.admin@volosoft.com",
                ConnectionString = ""
            };
        }

        [Fact]
        public async virtual Task Create_Should_Create_Admin_User()
        {
            //Arrange
            CreateTenantDto createDto = getCreateDto();

            //Act
            TenantDto createdEntityDto = await checkForValidationErrors( async () => {
                return await AppService.Create(createDto);
            });

            // Assert
            await UsingDbContextAsync(async context =>
            {
                Role adminRole = await context.Roles.FirstOrDefaultAsync(x => x.NormalizedName == "ADMIN" && x.TenantId == createdEntityDto.Id);
                adminRole.ShouldNotBeNull();

                User adminUser = await context.Users.Include(x => x.Roles).FirstOrDefaultAsync(e => e.NormalizedUserName == "ADMIN" && e.EmailAddress == createDto.AdminEmailAddress && e.TenantId == createdEntityDto.Id);
                adminUser.ShouldNotBeNull();

                adminUser.Roles.Any(x => x.RoleId == adminRole.Id).ShouldBeTrue();
            });
        }
    }
}