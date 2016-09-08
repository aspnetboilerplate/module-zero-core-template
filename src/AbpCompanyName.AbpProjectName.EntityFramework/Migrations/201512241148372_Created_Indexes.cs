namespace AbpCompanyName.AbpProjectName.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Created_Indexes : DbMigration
    {
        public override void Up()
        {
            DropIndex("AbpPermissions", new[] { "UserId" });
            DropIndex("AbpPermissions", new[] { "RoleId" });
            DropIndex("AbpRoles", new[] { "TenantId" });
            DropIndex("AbpSettings", new[] { "TenantId" });
            DropIndex("AbpSettings", new[] { "UserId" });
            DropIndex("AbpUserLogins", new[] { "UserId" });
            DropIndex("AbpUserRoles", new[] { "UserId" });
            DropIndex("AbpUsers", new[] { "TenantId" });

            CreateIndex("AbpAuditLogs", new[] { "TenantId", "ExecutionTime" });
            CreateIndex("AbpAuditLogs", new[] { "UserId", "ExecutionTime" });
            CreateIndex("AbpPermissions", new[] { "UserId", "Name" });
            CreateIndex("AbpPermissions", new[] { "RoleId", "Name" });
            CreateIndex("AbpRoles", new[] { "TenantId", "Name" });
            CreateIndex("AbpRoles", new[] { "IsDeleted", "TenantId", "Name" });
            CreateIndex("AbpSettings", new[] { "TenantId", "Name" });
            CreateIndex("AbpSettings", new[] { "UserId", "Name" });
            CreateIndex("AbpTenants", new[] { "TenancyName" });
            CreateIndex("AbpTenants", new[] { "IsDeleted", "TenancyName" });
            CreateIndex("AbpUserLogins", new[] { "UserId", "LoginProvider" });
            CreateIndex("AbpUserRoles", new[] { "UserId", "RoleId" });
            CreateIndex("AbpUserRoles", new[] { "RoleId" });
            CreateIndex("AbpUsers", new[] { "TenantId", "UserName" });
            CreateIndex("AbpUsers", new[] { "TenantId", "EmailAddress" });
            CreateIndex("AbpUsers", new[] { "IsDeleted", "TenantId", "UserName" });
            CreateIndex("AbpUsers", new[] { "IsDeleted", "TenantId", "EmailAddress" });

            CreateIndex("AbpOrganizationUnits", new[] { "TenantId", "ParentId" });
            CreateIndex("AbpOrganizationUnits", new[] { "TenantId", "Code" });

            CreateIndex("AbpUserOrganizationUnits", new[] { "TenantId", "UserId" });
            CreateIndex("AbpUserOrganizationUnits", new[] { "TenantId", "OrganizationUnitId" });
            CreateIndex("AbpUserOrganizationUnits", new[] { "UserId" });
            CreateIndex("AbpUserOrganizationUnits", new[] { "OrganizationUnitId" });

            CreateIndex("AbpLanguages", new[] { "TenantId", "Name" });

            CreateIndex("AbpLanguageTexts", new[] { "TenantId", "LanguageName", "Source", "Key" });

            CreateIndex("AbpEditions", new[] { "Name" });

            CreateIndex("AbpFeatures", new[] { "Discriminator", "TenantId", "Name" });
            CreateIndex("AbpFeatures", new[] { "Discriminator", "EditionId", "Name" });
            CreateIndex("AbpFeatures", new[] { "TenantId", "Name" });
        }
        
        public override void Down()
        {
            DropIndex("AbpFeatures", new[] { "TenantId", "Name" });
            DropIndex("AbpFeatures", new[] { "Discriminator", "EditionId", "Name" });
            DropIndex("AbpFeatures", new[] { "Discriminator", "TenantId", "Name" });

            DropIndex("AbpEditions", new[] { "Name" });

            DropIndex("AbpLanguageTexts", new[] { "TenantId", "LanguageName", "Source", "Key" });

            DropIndex("AbpLanguages", new[] { "TenantId", "Name" });

            DropIndex("AbpUserOrganizationUnits", new[] { "OrganizationUnitId" });
            DropIndex("AbpUserOrganizationUnits", new[] { "UserId" });
            DropIndex("AbpUserOrganizationUnits", new[] { "TenantId", "OrganizationUnitId" });
            DropIndex("AbpUserOrganizationUnits", new[] { "TenantId", "UserId" });

            DropIndex("AbpOrganizationUnits", new[] { "TenantId", "Code" });
            DropIndex("AbpOrganizationUnits", new[] { "TenantId", "ParentId" });

            DropIndex("AbpAuditLogs", new[] { "TenantId", "ExecutionTime" });
            DropIndex("AbpAuditLogs", new[] { "UserId", "ExecutionTime" });
            DropIndex("AbpPermissions", new[] { "UserId", "Name" });
            DropIndex("AbpPermissions", new[] { "RoleId", "Name" });
            DropIndex("AbpRoles", new[] { "TenantId", "Name" });
            DropIndex("AbpRoles", new[] { "IsDeleted", "TenantId", "Name" });
            DropIndex("AbpSettings", new[] { "TenantId", "Name" });
            DropIndex("AbpSettings", new[] { "UserId", "Name" });
            DropIndex("AbpTenants", new[] { "TenancyName" });
            DropIndex("AbpTenants", new[] { "IsDeleted", "TenancyName" });
            DropIndex("AbpUserLogins", new[] { "UserId", "LoginProvider" });
            DropIndex("AbpUserRoles", new[] { "UserId", "RoleId" });
            DropIndex("AbpUserRoles", new[] { "RoleId" });
            DropIndex("AbpUsers", new[] { "TenantId", "UserName" });
            DropIndex("AbpUsers", new[] { "TenantId", "EmailAddress" });
            DropIndex("AbpUsers", new[] { "IsDeleted", "TenantId", "UserName" });
            DropIndex("AbpUsers", new[] { "IsDeleted", "TenantId", "EmailAddress" });

            CreateIndex("AbpPermissions", new[] { "UserId" });
            CreateIndex("AbpPermissions", new[] { "RoleId" });
            CreateIndex("AbpRoles", new[] { "TenantId" });
            CreateIndex("AbpSettings", new[] { "TenantId" });
            CreateIndex("AbpSettings", new[] { "UserId" });
            CreateIndex("AbpUserLogins", new[] { "UserId" });
            CreateIndex("AbpUserRoles", new[] { "UserId" });
            CreateIndex("AbpUsers", new[] { "TenantId" });
        }
    }
}
