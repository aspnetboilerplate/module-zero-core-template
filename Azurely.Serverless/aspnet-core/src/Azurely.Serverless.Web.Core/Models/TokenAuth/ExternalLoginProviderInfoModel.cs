using Abp.AutoMapper;
using Azurely.Serverless.Authentication.External;

namespace Azurely.Serverless.Models.TokenAuth
{
    [AutoMapFrom(typeof(ExternalLoginProviderInfo))]
    public class ExternalLoginProviderInfoModel
    {
        public string Name { get; set; }

        public string ClientId { get; set; }
    }
}

