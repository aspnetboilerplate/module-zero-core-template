using Abp.Application.Services.Dto;
using System;

namespace AbpCompanyName.AbpProjectName.Users.Dto
{
    //custom PagedResultRequestDto
    public class PagedUserResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
        public DateTimeOffset? From { get; set; }//javascript date within timezone
        public DateTimeOffset? To { get; set; }//javascript date within timezone
    }
}
