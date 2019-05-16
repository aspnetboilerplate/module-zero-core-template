using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BoundedContext.Domain;

namespace BoundedContext.Application
{
    public class VehicleAppService : IVehicleAppService
    {

        private readonly IVehicleRepository _vehicleRepository;

        public VehicleAppService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }
        public async Task CreateOrUpdateVehicle(CreateOrUpdateVehicleInput input)
        {
            Guard.AssertArgumentNotNull(input, nameof(input));
            Guard.AssertArgumentNotNull(input.Vehicle, nameof(input.Vehicle));
            Guard.AssertArgumentNotLessThanOrEqualToZero(input.Vehicle.CountryId, nameof(input.Vehicle.CountryId));

            var vehicleSetting = await InitializeVehicleSettingsAsync(input.Vehicle.CountryId);
            if (!input.Vehicle.Id.HasValue)
            {
                await CreateVehicleAsync(input, vehicleSetting);
            }
            else
            {
                await UpdateVehicleAsync(input, vehicleSetting);
            }
        }
    }
}
