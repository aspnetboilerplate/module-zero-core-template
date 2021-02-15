using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Configuration;
using AbpCompanyName.AbpProjectName.Settings.Dto;

namespace AbpCompanyName.AbpProjectName.Settings
{
    public interface ITenantSettingsAppService
    {
        Task<IEnumerable<SettingDto>> GetAll();

        Task Change(SettingDto[] input);
    }
}
