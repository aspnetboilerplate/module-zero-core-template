using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using AbpCompanyName.AbpProjectName.Addresses;
using AbpCompanyName.AbpProjectName.Authorization.Users;

namespace AbpCompanyName.AbpProjectName.Invoices
{
    public class Invoice : Entity
    {
        public DateTime DueDate
        {
            get;
            set;
        }

        public long CustomerId
        {
            get;
            set;
        }

        public User Customer
        {
            get;
            set;
        }

        public IEnumerable<InvoiceItem> InvoiceItems
        {
            get;
            set;
        }

        public int? AddressId
        {
            get;
            set;
        }

        public Address Address
        {
            get;
            set;
        }

        public string Description
        {
            get;
            set;
        }
    }
}
