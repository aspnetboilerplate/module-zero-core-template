using BoundedContext.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.VisualBasic;

namespace BoundedContext.Infrastructure
{
    public class VehiclesEntityTypeConfigurations : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.ToTable("Vehicles", "Fleet");
            
            //Value Objects Mapping
            builder.OwnsOne(v => v.VehicleManufacturingInfo, vmi =>
            {
                vmi.Property(i => i.ModelId).HasColumnName("ModelId").IsRequired();
                vmi.Property(i => i.ChassisNo).HasColumnName("ChassisNo").IsRequired();
                vmi.Property(i => i.Year).HasColumnName("Year").IsRequired();
            });
            
            builder.OwnsOne(v => v.PurchaseInfo, pi =>
            {
                pi.Property(i => i.VendorId).HasColumnName("VendorId").IsRequired();
                pi.Property(i => i.Date).HasColumnName("PurchaseDate").IsRequired();
                pi.Property(i => i.Price).HasColumnName("PurchasePrice").IsRequired(false).HasColumnType("decimal(19,4)");
            });
            builder.OwnsOne(v => v.Specs, sp =>
            {
                sp.Property(i => i.ColorId).HasColumnName("ColorId").IsRequired();
                sp.Property(i => i.TrimLevelId).HasColumnName("TrimLevelId").IsRequired();
                sp.Property(i => i.EngineSize).HasColumnName("EngineSize").IsRequired(false);
                sp.Property(i => i.FuelTankSize).HasColumnName("FuelTankSize");
                sp.Property(i => i.FuelTypeId).HasColumnName("FuelTypeId").IsRequired();
            });
            builder.OwnsOne(v => v.LocationInfo, l =>
            {
                l.Property(i => i.CurrentLocationId).HasColumnName("CurrentLocationId").IsRequired();
            });
            builder.OwnsOne(v => v.Status, s =>
            {
                s.Property(i => i.StatusId).HasColumnName("StatusId").IsRequired();
                s.Property("_additionalStatuses").HasColumnName("AdditionalStatuses");
            });

            //Optionals
            builder.Property(v => v.Odometer).HasColumnName("Odometer").IsRequired(false);
            builder.Property(v => v.FuelId).HasColumnName("FuelId");
        }
    }
}
