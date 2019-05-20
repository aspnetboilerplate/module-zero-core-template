using System;
using System.ComponentModel.DataAnnotations;

namespace BoundedContext.Application.Dtos
{
    public class VehicleLicenseInfoDto
    {
        public VehicleLicenseInfoDto()
        {
            
        }
        public VehicleLicenseInfoDto(long licenseTypeId, long usageTypeId, string plateNo, string number,DateTime? expiryDate)
        {
            LicenseTypeId = licenseTypeId;
            UsageTypeId = usageTypeId;
            ExpiryDate = expiryDate;
            PlateNo = plateNo;
            Number = number;
        }
        
        public DateTime? ExpiryDate { get; set; }
        
        public string Number { get; set; }

        [Required]
        [Range(1, long.MaxValue)]
        public long LicenseTypeId { get; set; }

        [Required]
        [Range(1, long.MaxValue)]
        public long UsageTypeId { get; set; }

        [Required]
        //TODO check regex from setting
        public string PlateNo { get; set; }
    }
}
