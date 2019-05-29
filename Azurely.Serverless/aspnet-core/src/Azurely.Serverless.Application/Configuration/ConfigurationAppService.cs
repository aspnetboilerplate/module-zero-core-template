using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using Azurely.Serverless.Configuration.Dto;

namespace Azurely.Serverless.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : ServerlessAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

