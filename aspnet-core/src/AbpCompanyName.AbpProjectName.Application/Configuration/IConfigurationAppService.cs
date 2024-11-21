using AbpCompanyName.AbpProjectName.Configuration.Dto;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.Configuration;

public interface IConfigurationAppService
{
    Task ChangeUiTheme(ChangeUiThemeInput input);
}
