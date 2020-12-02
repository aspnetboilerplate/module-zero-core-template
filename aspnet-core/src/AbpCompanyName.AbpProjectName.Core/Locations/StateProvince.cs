using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;

namespace AbpCompanyName.AbpProjectName.Locations
{
    public class StateProvince : Entity
    {
        [MaxLength(50)]
        public string Name
        {
            get;
            set;
        }

        [MaxLength(20)]
        public string PhoneCode
        {
            get;
            set;
        }

        public int? CountryId
        {
            get;
            set;
        }

        public Country Country
        {
            get;
            set;
        }
    }
}
