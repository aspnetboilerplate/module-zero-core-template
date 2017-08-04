using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AutoMapper;

namespace AbpCompanyName.AbpProjectName.Users.Dto
{
    public class UserMapProfile : Profile
    {
        public UserMapProfile()
        {

            CreateMap<UserDto, User>();
            CreateMap<UserDto, User>().ForMember(x => x.Roles, opt => opt.Ignore());

            CreateMap<CreateUserDto, User>();
            CreateMap<CreateUserDto, User>().ForMember(x => x.Roles, opt => opt.Ignore());
        }
    }
}
