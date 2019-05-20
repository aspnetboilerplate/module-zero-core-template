using System;

namespace BoundedContext.Domain.ValueObjects
{
    public class VehicleLicenseInfo
    {
        private VehicleLicenseInfo()
        {
        }

        public long LicenseTypeId { get; private set; }
        public long UsageTypeId { get; private set; }
        public string PlateNo { get; private set; }

     
        public static VehicleLicenseInfo Create(long licenseTypeId, long usageTypeId, string plateNo, string number, DateTime? expiryDate)
        {
            VehicleLicenseInfo licenseInfo = new VehicleLicenseInfo();
             
            licenseInfo.LicenseTypeId = licenseTypeId;
            licenseInfo.PlateNo = plateNo;
            licenseInfo.UsageTypeId = usageTypeId;

            return licenseInfo;
        }
    }
}
