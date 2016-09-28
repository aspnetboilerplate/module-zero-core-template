namespace AbpCompanyName.AbpProjectName.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class Upgrade_To_Abp_1_0 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AbpUserClaims",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        TenantId = c.Int(),
                        UserId = c.Long(nullable: false),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                        CreationTime = c.DateTime(nullable: false),
                        CreatorUserId = c.Long(),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_UserClaim_MayHaveTenant", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AbpUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            AddColumn("dbo.AbpUsers", "LockoutEndDateUtc", c => c.DateTime());
            AddColumn("dbo.AbpUsers", "AccessFailedCount", c => c.Int(nullable: false, defaultValue: 0));
            AddColumn("dbo.AbpUsers", "IsLockoutEnabled", c => c.Boolean(nullable: false, defaultValue: true));
            AddColumn("dbo.AbpUsers", "PhoneNumber", c => c.String());
            AddColumn("dbo.AbpUsers", "IsPhoneNumberConfirmed", c => c.Boolean(nullable: false));
            AddColumn("dbo.AbpUsers", "SecurityStamp", c => c.String());
            AddColumn("dbo.AbpUsers", "IsTwoFactorEnabled", c => c.Boolean(nullable: false, defaultValue: true));

            Sql("UPDATE AbpUsers SET SecurityStamp = NEWID()");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AbpUserClaims", "UserId", "dbo.AbpUsers");
            DropIndex("dbo.AbpUserClaims", new[] { "UserId" });
            DropColumn("dbo.AbpUsers", "IsTwoFactorEnabled");
            DropColumn("dbo.AbpUsers", "SecurityStamp");
            DropColumn("dbo.AbpUsers", "IsPhoneNumberConfirmed");
            DropColumn("dbo.AbpUsers", "PhoneNumber");
            DropColumn("dbo.AbpUsers", "IsLockoutEnabled");
            DropColumn("dbo.AbpUsers", "AccessFailedCount");
            DropColumn("dbo.AbpUsers", "LockoutEndDateUtc");
            DropTable("dbo.AbpUserClaims",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_UserClaim_MayHaveTenant", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
