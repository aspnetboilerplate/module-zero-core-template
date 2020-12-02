using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Values;
using AbpCompanyName.AbpProjectName.Locations;
namespace AbpCompanyName.AbpProjectName.Addresses
{
    public class Address : Entity
    {
        public int? CityId
        {
            get;
            set;
        }

        public City City
        {
            get;
            set;
        }

        public string StateProvince
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
        [MaxLength(100)]
        public string AddressLine1
        {
            get;
            set;
        }

        [MaxLength(100)]
        public string AddressLine2
        {
            get;
            set;
        }

        [MaxLength(20)]
        public string PostalZipCode
        {
            get;
            set;
        }

        [MaxLength(20)]
        public string Phone1
        {
            get;
            set;
        }

        [MaxLength(20)]
        public string Phone2
        {
            get;
            set;
        }

        [MaxLength(20)]
        public string Phone3
        {
            get;
            set;
        }

        public long? Latitude
        {
            get;
            set;
        }

        public long? Longitude
        {
            get; 
            set;
        }
    }
}
