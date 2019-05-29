using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace Azurely.Serverless.Localization
{
    public static class ServerlessLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(ServerlessConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(ServerlessLocalizationConfigurer).GetAssembly(),
                        "Azurely.Serverless.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}

