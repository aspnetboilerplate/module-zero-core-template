using System.Collections.Generic;
using Abp.AutoMapper;
using AbpCompanyName.AbpProjectName.MultiTenancy;

namespace AbpCompanyName.AbpProjectName.Web.Models.Account
{
    public class TenantSelectionViewModel
    {
        public string Action { get; set; }

        public string ReturnUrl { get; set; }

        public string AuthSchema { get; set; }

        public List<TenantInfo> Tenants { get; set; }

        [AutoMapFrom(typeof(Tenant))]
        public class TenantInfo
        {
            public int Id { get; set; }

            public string TenancyName { get; set; }

            public string Name { get; set; }
        }
    }
}