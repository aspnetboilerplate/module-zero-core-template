using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AbpCompanyName.AbpProjectName.Authorization.Roles;

using Abp.Authorization.Roles;
using Abp.Authorization;
using Abp.MultiTenancy;

namespace AbpCompanyName.AbpProjectName.Roles.Dto
{
    [AutoMapFrom(typeof(Permission))]
    public class PermissionDto : EntityDto<long>
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }
    }
}