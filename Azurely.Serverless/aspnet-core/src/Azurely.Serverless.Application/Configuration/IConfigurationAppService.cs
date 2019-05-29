using System.Threading.Tasks;
using Azurely.Serverless.Configuration.Dto;

namespace Azurely.Serverless.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

