using System.ComponentModel.DataAnnotations;

namespace BoundedContext.Application.Dtos
{
    public class VehicleSpecsDto
    {
        public VehicleSpecsDto()
        {

        }

        public VehicleSpecsDto(long colorId, long trimLevelId, int? engineSize = null)
        {
            ColorId = colorId;
            TrimLevelId = trimLevelId;
            EngineSize = engineSize;
        }

        [Required]
        [Range(1, long.MaxValue)]
        public long ColorId { get; set; }

        [Required]
        [Range(1, long.MaxValue)]
        public long TrimLevelId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int FuelTypeId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int FuelTankSize { get; set; }

        public int? EngineSize { get; set; }
        
    }
}
