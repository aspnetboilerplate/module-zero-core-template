using System.Threading.Tasks;
using Abp;
using Abp.Application.Services;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Timing;
using BoundedContext.Application.Dtos;
using BoundedContext.Domain;
using BoundedContext.Domain.ValueObjects;

namespace BoundedContext.Application
{
    public class VehicleAppService : ApplicationService, IVehicleAppService
    {

        private readonly IRepository<Vehicle> _vehicleRepository;

        public VehicleAppService(IRepository<Vehicle> vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }
        public async Task CreateOrUpdateVehicle(CreateOrUpdateVehicleInput input)
        {
            if (!input.Vehicle.Id.HasValue)
            {
                await CreateVehicleAsync(input);
            }
            else
            {
                await UpdateVehicleAsync(input);
            }
        }
        private async Task CreateVehicleAsync(CreateOrUpdateVehicleInput input)
        {
            var vehicleDto = input.Vehicle;
            var valueObjects = CreateVehicleValueObjects(input.Vehicle);

            var manufacturingInfo = valueObjects.Item1;
            var location = valueObjects.Item2;
            var purchaseInfo = valueObjects.Item3;
            var specs = valueObjects.Item4;
            var vehicle = await Vehicle.CreateVehicle(vehicleDto.BranchId, vehicleDto.FuelId, vehicleDto.Odometer, manufacturingInfo, purchaseInfo, location, specs);

            await _vehicleRepository.InsertAsync(vehicle);
        }
        private async Task UpdateVehicleAsync(CreateOrUpdateVehicleInput input)
        {
            var vehicleDto = input.Vehicle;

            var vehicle = await _vehicleRepository.GetAsync(vehicleDto.Id.Value);
            if (vehicle.IsNullOrDeleted())
                throw new AbpException("VehicleNotFound");

            var valueObjects = CreateVehicleValueObjects(input.Vehicle);
            var manufacturingInfo = valueObjects.Item1;
            var location = valueObjects.Item2;
            var purchaseInfo = valueObjects.Item3;
            var specs = valueObjects.Item4;

            vehicle.SetBasicData(vehicleDto.BranchId, vehicleDto.FuelId);
            //set value objects
            vehicle.SetLocationInfo(location);
            vehicle.SetPurchaseInfo(purchaseInfo);
            vehicle.SetSpecs(specs);

            await vehicle.SetManufacturingInfo(manufacturingInfo);
            vehicle.LastModificationTime = Clock.Now;
        }
        private (VehicleManufacturingInfo, VehicleLocation, VehiclePurchaseInfo, VehicleSpecs, VehicleLicenseInfo) CreateVehicleValueObjects(VehicleDto vehicleDto)
        {
            var manufacturingInfoDto = vehicleDto.VehicleManufacturingInfo;
            VehicleManufacturingInfo vehicleManufacturingInfo = null;
            if (manufacturingInfoDto != null)
                vehicleManufacturingInfo = new VehicleManufacturingInfo(manufacturingInfoDto.ModelId, manufacturingInfoDto.Year, manufacturingInfoDto.ChassisNo);

            var locationInfoDto = vehicleDto.LocationInfo;
            VehicleLocation vehicleLocation = null;
            if (locationInfoDto != null)
                vehicleLocation = new VehicleLocation(locationInfoDto.CurrentLocationId);

            var purchaseInfoDto = vehicleDto.PurchaseInfo;
            VehiclePurchaseInfo vehiclePurchaseInfo = null;
            if (purchaseInfoDto != null)
                vehiclePurchaseInfo = VehiclePurchaseInfo.CreateVehiclePurchaseInfo(purchaseInfoDto.VendorId, purchaseInfoDto.Date, purchaseInfoDto.Price);

            var spexDto = vehicleDto.Specs;
            VehicleSpecs vehicleSpex = null;
            if (spexDto != null)
                vehicleSpex = VehicleSpecs.CreateVehicleSpex(spexDto.ColorId, spexDto.TrimLevelId,
                    spexDto.FuelTypeId, spexDto.FuelTankSize, spexDto.EngineSize);

            var licenseInfoDto = vehicleDto.VehicleLicenseInfo;
            VehicleLicenseInfo vehicleLicenseInfo = null;
            if (licenseInfoDto != null)
            {
                vehicleLicenseInfo = VehicleLicenseInfo.Create(licenseInfoDto.LicenseTypeId, licenseInfoDto.UsageTypeId,
                    licenseInfoDto.PlateNo, licenseInfoDto.Number, licenseInfoDto.ExpiryDate);
            }

            return (vehicleManufacturingInfo, vehicleLocation, vehiclePurchaseInfo, vehicleSpex, vehicleLicenseInfo);
        }
       
    }
}
