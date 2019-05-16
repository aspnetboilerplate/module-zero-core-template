using Abp.Domain.Values;

namespace BoundedContext.Domain.ValueObjects
{
    public class VehicleSpecs : ValueObject<VehicleSpecs>
    {
        private VehicleSpecs(long colorId, long trimLevelId, int fuelTypeId, int fuelTankSize, int? engineSize)
        {
            ColorId = colorId;
            TrimLevelId = trimLevelId;
            FuelTypeId = fuelTypeId;
            FuelTankSize = fuelTankSize;
            EngineSize = engineSize;
        }
        public long ColorId { get; private set; }
        public long TrimLevelId { get; private set; }
        public int FuelTypeId { get; private set; }
        public int FuelTankSize { get; private set; }
        public int? EngineSize { get; private set; }
        

        public static VehicleSpecs CreateVehicleSpex(long colorId, long trimLevelId, int fuelTypeId, int fuelTankSize, int? engineSize)
        {
            return new VehicleSpecs(colorId, trimLevelId, fuelTypeId, fuelTankSize, engineSize );
        }

    }
}
