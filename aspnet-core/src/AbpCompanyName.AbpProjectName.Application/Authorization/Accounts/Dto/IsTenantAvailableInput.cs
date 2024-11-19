using Abp.MultiTenancy;
using System.ComponentModel.DataAnnotations;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto;

public class IsTenantAvailableInput
{
    [Required]
    [StringLength(AbpTenantBase.MaxTenancyNameLength)]
    public string TenancyName { get; set; }
}
