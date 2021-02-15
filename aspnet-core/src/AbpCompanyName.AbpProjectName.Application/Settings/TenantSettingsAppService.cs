using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.UI;
using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Settings.Dto;

namespace AbpCompanyName.AbpProjectName.Settings
{
    [AbpAuthorize(PermissionNames.Pages_TenantSettings)]
    public class TenantSettingsAppService : AbpProjectNameAppServiceBase, ITenantSettingsAppService
    {
        public async Task<IEnumerable<SettingDto>> GetAll()
        {
            var result = await SettingManager.GetAllSettingValuesAsync(SettingScopes.Tenant);
            return result.Select(ff => new SettingDto
            {
                Name = ff.Name,
                Value = ff.Value
            });
        }

        public async Task Change(SettingDto[] input)
        {
            if (AbpSession.TenantId == null)
                throw new UserFriendlyException(L("YouShouldLoginWithTenantInOrderToMakeThisChange"));
            foreach (var item in input)
            {
                await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, item.Name, item.Value);
            }
        }
    }
}
