using System;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using BoundedContext.Domain.ValueObjects;

namespace BoundedContext.Domain
{
    public class Vehicle : FullAuditedAggregateRoot, IMustHaveTenant
    {
        private Vehicle()
        {
        }

        //Basic Data
        public int? Odometer { get; private set; }
        public int FuelId { get; private set; }
        public int BranchId { get; private set; }
        public VehicleManufacturingInfo VehicleManufacturingInfo { get; private set; }
        public VehicleLocation LocationInfo { get; private set; }
        public VehiclePurchaseInfo PurchaseInfo { get; private set; }
        public VehicleStatus Status { get; private set; }
        public VehicleSpecs Specs { get; private set; }
        public DateTime? OutOfServiceDate { get; private set; }
        public DateTime? ExtensionDate { get; private set; }
        public int TenantId { get; set; }

        public static async Task<Vehicle> CreateVehicle(int branchId, int fuel, int? odometer,
                                                        VehicleManufacturingInfo manufacturingInfo, VehiclePurchaseInfo purchaseInfo,
                                                        VehicleLocation locationInfo, VehicleSpecs vehicleSpex)
        {
            var vehicle = new Vehicle();
            vehicle.SetBasicData(branchId, fuel);
            vehicle.SetLocationInfo(locationInfo);
            vehicle.SetSpecs(vehicleSpex);
            vehicle.SetPurchaseInfo(purchaseInfo);
            vehicle.MarkVehicleAsReady();
            return vehicle;
        }

        
        public void SetBasicData(int branchId, int fuelId)
        {
            BranchId = branchId;
            SetFuel(fuelId);
        }

        public void SetFuel(int fuelId)
        {
            FuelId = fuelId;
        }

        
        
        public async Task SetManufacturingInfo(VehicleManufacturingInfo manufacturingInfo)
        {
            VehicleManufacturingInfo = manufacturingInfo;
        }

        public void SetPurchaseInfo(VehiclePurchaseInfo purchaseInfo)
        {
            PurchaseInfo = purchaseInfo;
        }

        public void SetLocationInfo(VehicleLocation locationInfo)
        {
            LocationInfo = locationInfo;
        }

        
        public void SetSpecs(VehicleSpecs vehicleSpex)
        {
            Specs = vehicleSpex;
        }

       
        public void MarkVehicleAsReady()
        {
            var readyStatus = new VehicleStatus((long) VehicleStatusEnum.Ready);
            Status = readyStatus;
        }

        
        public void SetStatus(VehicleStatus vehicleStatus)
        {
            Status = vehicleStatus;
        }
    }
}