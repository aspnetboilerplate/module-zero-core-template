using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.MultiTenancy;

namespace AbpCompanyName.AbpProjectName.MultiTenancy.Dto
{
    [AutoMapTo(typeof(Tenant)), AutoMapFrom(typeof(Tenant))]
    public class TenantDto : EntityDto
    {
        [Required]
        [StringLength(AbpTenantBase.MaxTenancyNameLength)]
        [RegularExpression(Tenant.TenancyNameRegex)]
        public string TenancyName { get; set; }

        [Required]
        [StringLength(Tenant.MaxNameLength)]
        public string Name { get; set; }        
        
        [Required]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string AdminEmailAddress { get; set; }

        [MaxLength(AbpTenantBase.MaxConnectionStringLength)]
        public string ConnectionString { get; set; }

        public bool IsActive {get; set;}
    }
}