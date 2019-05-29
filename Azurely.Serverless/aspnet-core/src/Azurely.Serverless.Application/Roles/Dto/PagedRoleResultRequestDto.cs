using Abp.Application.Services.Dto;

namespace Azurely.Serverless.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}


