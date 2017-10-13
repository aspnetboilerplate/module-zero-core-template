using System.Threading.Tasks;
using AbpCompanyName.AbpProjectName.Configuration.Dto;

namespace AbpCompanyName.AbpProjectName.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
