using Abp.Application.Services.Dto;
using Abp.Runtime.Validation;

namespace AbpCompanyName.AbpProjectName.MultiTenancy.Dto;

public class PagedTenantResultRequestDto : PagedResultRequestDto, IShouldNormalize
{
    public string Keyword { get; set; }
    public bool? IsActive { get; set; }

    public string Sorting { get; set; }

    public void Normalize()
    {
        if (string.IsNullOrEmpty(Sorting))
        {
            Sorting = "TenancyName,Name";
        }

        Keyword = Keyword?.Trim();
    }
}

