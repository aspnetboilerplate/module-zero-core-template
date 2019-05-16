using System;
using System.ComponentModel.DataAnnotations;

namespace BoundedContext.Application.Dtos
{
    public class VehiclePurchaseInfoDto
    {
        public VehiclePurchaseInfoDto()
        {
            
        }
        public VehiclePurchaseInfoDto(Guid vendorId, DateTime date, decimal? price = null)
        {
            VendorId = vendorId;
            Date = date;
            Price = price;
        }

        [Required]
        public Guid VendorId { get; set; }

        [Required]
        //TODO check range from setting
        public DateTime Date { get; set; }
        
        //TODO check range from setting if has value
        public decimal? Price { get; set; }
    }
}
