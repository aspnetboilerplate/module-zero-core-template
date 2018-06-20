using AutoMapper;
using AbpCompanyName.AbpProjectName.Authorization.Users;

namespace AbpCompanyName.AbpProjectName.Users.Dto
{
    public class UserMapProfile : Profile
    {
        public UserMapProfile()
        {
            CreateMap<User, UserDto>(MemberList.Destination)
                .ForMember(x => x.RoleNames, opt => opt.Ignore());

            CreateMap<UserDto, User>(MemberList.Source)
                .ForMember(x => x.Roles, opt => opt.Ignore())
                .ForMember(x => x.FullName, opt => opt.Ignore())
                .ForSourceMember(x => x.RoleNames, opt => opt.Ignore());

            CreateMap<CreateUserDto, User>(MemberList.Source)
                .ForMember(x => x.Roles, opt => opt.Ignore())
                .ForSourceMember(x => x.RoleNames, opt => opt.Ignore());
        }
    }
}
