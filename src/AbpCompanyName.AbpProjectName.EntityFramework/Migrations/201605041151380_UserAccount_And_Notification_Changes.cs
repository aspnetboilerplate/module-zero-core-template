namespace AbpCompanyName.AbpProjectName.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserAccount_And_Notification_Changes : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AbpUserAccounts", "LastLoginTime", c => c.DateTime());
            RenameColumn("dbo.AbpUserNotifications", "NotificationId", "TenantNotificationId");

            Sql(@"INSERT INTO AbpUserAccounts(TenantId, UserId, UserName, EmailAddress, LastLoginTime, CreationTime, IsDeleted) 
SELECT TenantId, Id AS UserId, UserName, EmailAddress, LastLoginTime, CreationTime, IsDeleted FROM AbpUsers");
        }
        
        public override void Down()
        {
            RenameColumn("dbo.AbpUserNotifications", "TenantNotificationId", "NotificationId");
            DropColumn("dbo.AbpUserAccounts", "LastLoginTime");
        }
    }
}
