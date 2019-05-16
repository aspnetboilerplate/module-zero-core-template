using System.ComponentModel.DataAnnotations;

namespace BoundedContext.Application.Dtos
{
    public class VehicleLocationDto
    {
        public VehicleLocationDto()
        {
            
        }
        public VehicleLocationDto(int currentLocationId)
        {
            CurrentLocationId = currentLocationId;
        }

        [Required]
        [Range(1, int.MaxValue)]
        public int CurrentLocationId { get; set; }
    }
}
