using System;
using Abp.Domain.Values;
using Abp.Localization.Sources;

namespace BoundedContext.Domain.ValueObjects
{
    public class VehiclePurchaseInfo : ValueObject<VehiclePurchaseInfo>
    {
        private VehiclePurchaseInfo(Guid vendorId, DateTime date, decimal? price)
        {
            VendorId = vendorId;
            Date = date;
            Price = price;
        }
        public Guid VendorId { get; private set; }
        public DateTime Date { get; private set; }
        public decimal? Price { get; private set; }

        public static VehiclePurchaseInfo CreateVehiclePurchaseInfo(Guid vendorId, DateTime date, decimal? price)
        {
           return new VehiclePurchaseInfo(vendorId, date, price);
        }
    }
}
