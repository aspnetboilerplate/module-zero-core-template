using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Azurely.Serverless.Roles.Dto;
using Azurely.Serverless.Users.Dto;

namespace Azurely.Serverless.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}

