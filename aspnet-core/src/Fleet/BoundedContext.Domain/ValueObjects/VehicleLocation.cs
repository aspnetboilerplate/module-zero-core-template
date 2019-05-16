using Abp.Domain.Values;

namespace BoundedContext.Domain.ValueObjects
{
    public class VehicleLocation : ValueObject<VehicleLocation>
    {
        private VehicleLocation()
        {    
        }
        public VehicleLocation(int currentLocationId)
        {
            CurrentLocationId = currentLocationId;
        }
        public int CurrentLocationId { get; private set; }

    }
}
