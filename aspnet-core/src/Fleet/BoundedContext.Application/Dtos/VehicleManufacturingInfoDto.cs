using System.ComponentModel.DataAnnotations;

namespace BoundedContext.Application.Dtos
{
    public class VehicleManufacturingInfoDto
    {
        public VehicleManufacturingInfoDto()
        {

        }
        public VehicleManufacturingInfoDto(int modelId, int year, string chassisNo)
        {
            ModelId = modelId;
            Year = year;
            ChassisNo = chassisNo;
        }

        [Required]
        [Range(1, int.MaxValue)]
        public int ModelId { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public string ChassisNo { get; set; }
    }
}
