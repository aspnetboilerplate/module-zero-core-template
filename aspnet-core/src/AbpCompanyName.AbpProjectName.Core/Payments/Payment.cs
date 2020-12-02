using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Invoices;

namespace AbpCompanyName.AbpProjectName.Payments
{
    public class Payment : Entity<Guid>
    {
        public PaymentType Type
        {
            get;
            set;
        }

        public PaymentState State
        {
            get;
            set;
        }

        public DateTime Date
        {
            get;
            set;
        }

        public decimal Amount
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

        public Guid ReferenceId
        {
            get;
            set;
        }

        public Guid? InvoiceId
        {
            get;
            set;
        }

        public Invoice Invoice
        {
            get;
            set;
        }
    }
}
