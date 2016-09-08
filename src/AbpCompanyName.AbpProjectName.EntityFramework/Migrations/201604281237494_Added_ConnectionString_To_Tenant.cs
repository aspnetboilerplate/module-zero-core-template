namespace AbpCompanyName.AbpProjectName.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Added_ConnectionString_To_Tenant : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AbpTenants", "ConnectionString", c => c.String(maxLength: 1024));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AbpTenants", "ConnectionString");
        }
    }
}
