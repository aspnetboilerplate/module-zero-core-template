using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.MultiTenancy.Dto;

using Microsoft.EntityFrameworkCore;

using Shouldly;
using Xunit;

namespace AbpCompanyName.AbpProjectName.Tests.MultiTenancy
{
    public class TenantAppService_Tests : AbpProjectNameAsyncServiceTestBase<Tenant, TenantDto, int, TenantAppService, CreateTenantDto, TenantDto>
    {
        public TenantAppService_Tests()
        {
            LoginAsHost("admin");
        }

        protected override async Task<Tenant> CreateEntity(int number)
        {
            return new Tenant
            {
                TenancyName = $"Tenant{number.ToString("000.#")}",
                Name = $"Tenant{number.ToString("000.#")}",
                IsActive = true
            };
        }

        protected override CreateTenantDto GetCreateDto()
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

        protected override TenantDto GetUpdateDto(int key)
        {
            return new TenantDto
            {
                Id = key,
                TenancyName = "updatedtenant",
                Name = "Updated Tenant",
                IsActive = true
            };
        }

        public async override Task UpdateChecks(AbpProjectNameDbContext context, TenantDto updatedObject)
        {
            updatedObject.TenancyName.ShouldBe("updatedtenant");
            updatedObject.Name.ShouldBe("Updated Tenant");
            updatedObject.IsActive.ShouldBeTrue();
        }

        [Fact]
        public async virtual Task Create_Should_Create_Admin_User()
        {
            //Arrange
            CreateTenantDto createDto = GetCreateDto();

            //Act
            TenantDto createdEntityDto = await CheckForValidationErrors( async () =>
                await AppService.Create(createDto)
            ) as TenantDto;

            //Assert
            await UsingDbContextAsync(async context =>
            {
                Role adminRole = await context.Roles.FirstOrDefaultAsync(x => x.NormalizedName == "ADMIN" && x.TenantId == createdEntityDto.Id);
                adminRole.ShouldNotBeNull();

                User adminUser = await context.Users.Include(x => x.Roles).FirstOrDefaultAsync(e => e.NormalizedUserName == "ADMIN" && e.EmailAddress == createDto.AdminEmailAddress && e.TenantId == createdEntityDto.Id);
                adminUser.ShouldNotBeNull();

                adminUser.Roles.Any(x => x.RoleId == adminRole.Id).ShouldBeTrue();
            });
        }

        [Fact]
        public async virtual Task GetAll_Sorting_Test()
        {
            //Arrange
            await Create(20);

            //Act
            PagedResultDto<TenantDto> tenants = await AppService.GetAll(
                new PagedResultRequestDto { MaxResultCount = 10, SkipCount = 10 }
            );

            //Assert
            tenants.Items.ShouldBeInOrder(SortDirection.Ascending,
                Comparer<TenantDto>.Create((x, y) => x.Name.CompareTo(y.Name))
            );

            // default tenant is first tenant
            tenants.Items[0].Name.ShouldBe("Tenant009");
            tenants.Items[9].Name.ShouldBe("Tenant018");
        }
    }
}