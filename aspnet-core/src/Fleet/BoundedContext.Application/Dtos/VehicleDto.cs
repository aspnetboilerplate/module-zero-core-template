using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;

namespace BoundedContext.Application.Dtos
{
    public class VehicleDto :AuditedEntityDto<int?>
    {
        public VehicleDto()
        {
            VehicleLicenseInfo = new VehicleLicenseInfoDto();
            VehicleManufacturingInfo = new VehicleManufacturingInfoDto();
            Specs = new VehicleSpecsDto();
            PurchaseInfo = new VehiclePurchaseInfoDto();
            LocationInfo = new VehicleLocationDto();
        }

        public int? Odometer { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int FuelId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int BranchId { get; set; }

        [Required]
        public VehicleManufacturingInfoDto VehicleManufacturingInfo { get; set; }

        [Required]
        public VehicleLicenseInfoDto VehicleLicenseInfo { get; set; }

        [Required]
        public VehicleLocationDto LocationInfo { get; set; }

        [Required]
        public VehiclePurchaseInfoDto PurchaseInfo { get; set; }

        [Required]
        public VehicleSpecsDto Specs { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int CountryId { get; set; }

        public int CarCategoryId { get; set; }

        public long MmanufacturerId { get; set; }
        public string Status { get; set; }
    }
}
