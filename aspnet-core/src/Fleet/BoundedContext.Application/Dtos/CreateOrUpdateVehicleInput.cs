using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BoundedContext.Application.Dtos
{
    public class CreateOrUpdateVehicleInput
    {
        [Required]
        public VehicleDto Vehicle { get; set; }
    }
}
