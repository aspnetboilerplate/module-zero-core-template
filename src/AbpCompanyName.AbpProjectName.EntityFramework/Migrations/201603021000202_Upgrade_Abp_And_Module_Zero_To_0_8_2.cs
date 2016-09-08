namespace AbpCompanyName.AbpProjectName.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Upgrade_Abp_And_Module_Zero_To_0_8_2 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.AbpNotificationSubscriptions", new[] { "NotificationName", "EntityTypeName", "EntityId", "UserId" });
            AlterColumn("dbo.AbpNotifications", "NotificationName", c => c.String(nullable: false, maxLength: 96));
            AlterColumn("dbo.AbpNotifications", "EntityTypeName", c => c.String(maxLength: 250));
            AlterColumn("dbo.AbpNotifications", "EntityId", c => c.String(maxLength: 96));
            AlterColumn("dbo.AbpNotificationSubscriptions", "NotificationName", c => c.String(maxLength: 96));
            AlterColumn("dbo.AbpNotificationSubscriptions", "EntityTypeName", c => c.String(maxLength: 250));
            AlterColumn("dbo.AbpNotificationSubscriptions", "EntityId", c => c.String(maxLength: 96));
            CreateIndex("dbo.AbpNotificationSubscriptions", new[] { "NotificationName", "EntityTypeName", "EntityId", "UserId" });
        }
        
        public override void Down()
        {
            DropIndex("dbo.AbpNotificationSubscriptions", new[] { "NotificationName", "EntityTypeName", "EntityId", "UserId" });
            AlterColumn("dbo.AbpNotificationSubscriptions", "EntityId", c => c.String(maxLength: 128));
            AlterColumn("dbo.AbpNotificationSubscriptions", "EntityTypeName", c => c.String(maxLength: 256));
            AlterColumn("dbo.AbpNotificationSubscriptions", "NotificationName", c => c.String(maxLength: 128));
            AlterColumn("dbo.AbpNotifications", "EntityId", c => c.String(maxLength: 128));
            AlterColumn("dbo.AbpNotifications", "EntityTypeName", c => c.String(maxLength: 256));
            AlterColumn("dbo.AbpNotifications", "NotificationName", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.AbpNotificationSubscriptions", new[] { "NotificationName", "EntityTypeName", "EntityId", "UserId" });
        }
    }
}
