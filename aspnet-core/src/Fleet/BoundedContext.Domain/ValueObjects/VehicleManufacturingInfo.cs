using Abp.Domain.Values;

namespace BoundedContext.Domain.ValueObjects
{
    public class VehicleManufacturingInfo : ValueObject<VehicleManufacturingInfo>
    {
        private VehicleManufacturingInfo()
        {

        }
        public VehicleManufacturingInfo(int modelId, int year, string chassisNo)
        {
            ModelId = modelId;
            Year = year;
            ChassisNo = chassisNo;
        }

        public int ModelId { get; private set; }
        public int Year { get; private set; }
        public string ChassisNo { get; private set; }
    }
}
