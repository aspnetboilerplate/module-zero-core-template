using BoundedContext.Domain;

namespace BoundedContext.Application.Dtos
{
    public class VehicleStatusDto
    {
        public VehicleStatusDto()
        {
            StatusId = (long)VehicleStatusEnum.Ready;
            AdditionalStatus = null;
        }

        public VehicleStatusDto(long statusId) : this(statusId, null)
        {

        }

        public VehicleStatusDto(long statusId, long? additionalStatusId)
        {
            StatusId = statusId;
            AdditionalStatus = additionalStatusId;
        }

        public long StatusId { get; set; }
        public long? AdditionalStatus { get; set; }
    }
}
