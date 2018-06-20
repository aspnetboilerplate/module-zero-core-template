using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace AbpCompanyName.AbpProjectName.MultiTenancy.Dto
{
    public class TenantMapProfile : Profile
    {
        public TenantMapProfile()
        {
            CreateMap<CreateTenantDto, Tenant>(MemberList.Source)
                .ForSourceMember(x => x.AdminEmailAddress, opt => opt.Ignore());
        }
    }
}
