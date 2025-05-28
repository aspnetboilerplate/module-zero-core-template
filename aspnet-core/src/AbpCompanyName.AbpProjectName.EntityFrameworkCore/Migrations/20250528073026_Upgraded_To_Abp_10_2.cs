using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbpCompanyName.AbpProjectName.Migrations
{
    /// <inheritdoc />
    public partial class Upgraded_To_Abp_10_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Parameters",
                table: "AbpAuditLogs",
                type: "nvarchar(max)",
                maxLength: 4096,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(2048)",
                oldMaxLength: 2048,
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Parameters",
                table: "AbpAuditLogs",
                type: "nvarchar(2048)",
                maxLength: 2048,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldMaxLength: 4096,
                oldNullable: true);
        }
    }
}
