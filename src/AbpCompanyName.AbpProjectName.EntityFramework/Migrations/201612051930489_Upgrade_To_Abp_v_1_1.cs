namespace AbpCompanyName.AbpProjectName.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Upgrade_To_Abp_v_1_1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AbpUsers", "EmailConfirmationCode", c => c.String(maxLength: 328));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.AbpUsers", "EmailConfirmationCode", c => c.String(maxLength: 128));
        }
    }
}
