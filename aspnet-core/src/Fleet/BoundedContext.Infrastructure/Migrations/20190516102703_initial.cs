using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BoundedContext.Infrastructure.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Fleet");

            migrationBuilder.CreateSequence(
                name: "VehiclesSeq",
                schema: "Fleet",
                incrementBy: 10);

            migrationBuilder.CreateTable(
                name: "Vehicles",
                schema: "Fleet",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Odometer = table.Column<int>(nullable: true),
                    FuelId = table.Column<int>(nullable: false),
                    BranchId = table.Column<int>(nullable: false),
                    ModelId = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: false),
                    ChassisNo = table.Column<string>(nullable: false),
                    CurrentLocationId = table.Column<int>(nullable: false),
                    VendorId = table.Column<Guid>(nullable: false),
                    PurchaseDate = table.Column<DateTime>(nullable: false),
                    PurchasePrice = table.Column<decimal>(type: "decimal(19,4)", nullable: true),
                    StatusId = table.Column<long>(nullable: false),
                    AdditionalStatuses = table.Column<string>(nullable: true),
                    ColorId = table.Column<long>(nullable: false),
                    TrimLevelId = table.Column<long>(nullable: false),
                    FuelTypeId = table.Column<int>(nullable: false),
                    FuelTankSize = table.Column<int>(nullable: false),
                    EngineSize = table.Column<int>(nullable: true),
                    OutOfServiceDate = table.Column<DateTime>(nullable: true),
                    ExtensionDate = table.Column<DateTime>(nullable: true),
                    TenantId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vehicles",
                schema: "Fleet");

            migrationBuilder.DropSequence(
                name: "VehiclesSeq",
                schema: "Fleet");
        }
    }
}
