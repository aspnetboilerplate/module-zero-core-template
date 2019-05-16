using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BoundedContext.Application.Dtos
{
    class CreateOrUpdateVehicleInput
    {
        [Required]
        public VehicleDto Vehicle { get; set; }
    }
}
