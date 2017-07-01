using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.MultiTenancy;
using Abp.Runtime.Security;

using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Editions;
using AbpCompanyName.AbpProjectName.MultiTenancy.Dto;

using Microsoft.AspNetCore.Identity;
using Abp.IdentityFramework;
using Abp.UI;
using Abp.Domain.Uow;

namespace AbpCompanyName.AbpProjectName.MultiTenancy
{
    public class TenantAppService : AsyncCrudAppService<Tenant, TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>, ITenantAppService, IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
        private readonly TenantManager tenantManager;
        private readonly EditionManager editionManager;
        private readonly RoleManager roleManager;
        private readonly UserManager userManager;
        private readonly IAbpZeroDbMigrator abpZeroDbMigrator;
        private readonly IPasswordHasher<User> passwordHasher;
        private readonly IRepository<User, long> userRepository;

        public TenantAppService(
            IRepository<Tenant, int> service, 
            IRepository<User, long> userRepository,

            TenantManager tenantManager, 
            EditionManager editionManager,
            UserManager userManager,
            
            RoleManager roleManager, 
            IAbpZeroDbMigrator abpZeroDbMigrator, 
            IPasswordHasher<User> passwordHasher
            ) : base(service)
        {
            this.tenantManager = tenantManager; 
            this.editionManager = editionManager;
            this.roleManager = roleManager;
            this.abpZeroDbMigrator = abpZeroDbMigrator;
            this.passwordHasher = passwordHasher;
            this.userManager = userManager;
            this.userRepository = userRepository;


            CreatePermissionName 
            = GetAllPermissionName 
            = GetPermissionName 
            = UpdatePermissionName
            = DeletePermissionName
            = PermissionNames.Pages_Tenants;
        }
        
        public override async Task<TenantDto> Get(EntityDto<int> input)
        {
            CheckGetPermission();

            TenantDto tenantDto = await base.Get(input);

            Role tenantAdminRole = null;
            User tenantAdminUser = null;
            using(this.CurrentUnitOfWork.SetTenantId(tenantDto.Id))
            {
                tenantAdminRole = await this.roleManager.GetRoleByNameAsync ("Admin");
                tenantAdminUser = userRepository.GetAllIncluding(x=>x.Roles).Single( y => y.Roles.Any(z=> z.RoleId == tenantAdminRole.Id) );
            }

            tenantDto.AdminEmailAddress = tenantAdminUser.EmailAddress;

            return tenantDto;
        }
        
        [UnitOfWork]
        public override async Task<TenantDto> Create(CreateTenantDto input)
        {
            CheckCreatePermission();

            //Create tenant
            var tenant = ObjectMapper.Map<Tenant>(input);
            tenant.ConnectionString = input.ConnectionString.IsNullOrEmpty()
                ? null
                : SimpleStringCipher.Instance.Encrypt(input.ConnectionString);

            var defaultEdition = await editionManager.FindByNameAsync(EditionManager.DefaultEditionName);
            if (defaultEdition != null)
            {
                tenant.EditionId = defaultEdition.Id;
            }

            await tenantManager.CreateAsync(tenant);
            await CurrentUnitOfWork.SaveChangesAsync(); //To get new tenant's id.

            //Create tenant database
            abpZeroDbMigrator.CreateOrMigrateForTenant(tenant);

            //We are working entities of new tenant, so changing tenant filter
            using (CurrentUnitOfWork.SetTenantId(tenant.Id))
            {
                // Check directly
                bool isGranted = await this.PermissionChecker.IsGrantedAsync(PermissionNames.Pages_Tenants);

                //Create static roles for new tenant
                CheckErrors(await roleManager.CreateStaticRoles(tenant.Id));

                await CurrentUnitOfWork.SaveChangesAsync(); //To get static role ids

                //grant all permissions to admin role
                var adminRole = roleManager.Roles.Single(r => r.Name == StaticRoleNames.Tenants.Admin);
                await roleManager.GrantAllPermissionsAsync(adminRole);

                //Create admin user for the tenant
                var adminUser = User.CreateTenantAdminUser(tenant.Id, input.AdminEmailAddress);
                adminUser.Password = passwordHasher.HashPassword(adminUser, User.DefaultPassword);
                CheckErrors(await userManager.CreateAsync(adminUser));
                await CurrentUnitOfWork.SaveChangesAsync(); //To get admin user's id

                //Assign admin user to role!
                CheckErrors(await userManager.AddToRoleAsync(adminUser, adminRole.Name));
                await CurrentUnitOfWork.SaveChangesAsync();
            }

            return MapToEntityDto(tenant);
        }

        [UnitOfWork]
        public override async Task<TenantDto> Update(TenantDto input)
        {
            CheckUpdatePermission();

            Tenant tenant = tenantManager.GetById(input.Id);

            Role tenantAdminRole = null;
            User tenantAdminUser = null;
            using(this.CurrentUnitOfWork.SetTenantId(tenant.Id))
            {
                tenantAdminRole = await this.roleManager.GetRoleByNameAsync ("Admin");

                tenantAdminUser = userRepository.GetAll()
                    .Where(x=> x.TenantId == tenant.Id && x.Roles.Any(y => y.RoleId == tenantAdminRole.Id) )
                    .FirstOrDefault();
            }

            // Update the admin email address
            if(input.AdminEmailAddress != tenantAdminUser.EmailAddress)
            {
                User existingUser = null;
                using(this.CurrentUnitOfWork.SetTenantId(tenant.Id))
                {
                    existingUser = userRepository.GetAll()
                                .Where(x=> x.EmailAddress == input.AdminEmailAddress && x.TenantId == tenant.Id)
                                .FirstOrDefault();
                }
                
                if ( existingUser != null )
                {
                    throw new UserFriendlyException("There is an existing user for the tenant with email address " + input.AdminEmailAddress);
                }

                tenantAdminUser.EmailAddress = input.AdminEmailAddress;
                tenantAdminUser.SetNormalizedNames();
            }

            string connectionString = tenant.ConnectionString.IsNullOrEmpty() ? null : SimpleStringCipher.Instance.Decrypt(tenant.ConnectionString);
            if(connectionString != input.ConnectionString)
            {
                 throw new UserFriendlyException("Changing Connection string is not supported.");
            }

            MapToEntity(input, tenant);
            return input;
        }

        [UnitOfWork]
        public override async Task Delete(EntityDto<int> input)
        {
            CheckDeletePermission();

            Tenant tenant = await tenantManager.GetByIdAsync(input.Id);
            await tenantManager.DeleteAsync(tenant);
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}