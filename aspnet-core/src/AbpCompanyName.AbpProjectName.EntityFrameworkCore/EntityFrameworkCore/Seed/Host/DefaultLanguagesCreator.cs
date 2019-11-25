using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Abp.Localization;
using Abp.MultiTenancy;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore.Seed.Host
{
    public class DefaultLanguagesCreator
    {
        public static List<ApplicationLanguage> InitialLanguages => GetInitialLanguages();

        private readonly AbpProjectNameDbContext _context;

        private static List<ApplicationLanguage> GetInitialLanguages()
        {
            var tenantId = AbpProjectNameConsts.MultiTenancyEnabled ? null : (int?)MultiTenancyConsts.DefaultTenantId;
            return new List<ApplicationLanguage>
            {
                new ApplicationLanguage(tenantId, "en", "English", "flag-icon flag-icon-us"),
                new ApplicationLanguage(tenantId, "ar", "العربية", "flag-icon flag-icon-sa"),
                new ApplicationLanguage(tenantId, "de", "German", "flag-icon flag-icon-de"),
                new ApplicationLanguage(tenantId, "it", "Italiano", "flag-icon flag-icon-it"),
                new ApplicationLanguage(tenantId, "fr", "Français", "flag-icon flag-icon-fr"),
                new ApplicationLanguage(tenantId, "pt-BR", "Português", "flag-icon flag-icon-br"),
                new ApplicationLanguage(tenantId, "tr", "Türkçe", "flag-icon flag-icon-tr"),
                new ApplicationLanguage(tenantId, "ru", "Русский", "flag-icon flag-icon-ru"),
                new ApplicationLanguage(tenantId, "zh-Hans", "简体中文", "flag-icon flag-icon-cn"),
                new ApplicationLanguage(tenantId, "es-MX", "Español México", "flag-icon flag-icon-mx"),
                new ApplicationLanguage(tenantId, "nl", "Nederlands", "flag-icon flag-icon-nl"),
                new ApplicationLanguage(tenantId, "ja", "日本語", "flag-icon flag-icon-jp")
            };
        }

        public DefaultLanguagesCreator(AbpProjectNameDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateLanguages();
        }

        private void CreateLanguages()
        {
            foreach (var language in InitialLanguages)
            {
                AddLanguageIfNotExists(language);
            }
        }

        private void AddLanguageIfNotExists(ApplicationLanguage language)
        {
            if (_context.Languages.IgnoreQueryFilters().Any(l => l.TenantId == language.TenantId && l.Name == language.Name))
            {
                return;
            }

            _context.Languages.Add(language);
            _context.SaveChanges();
        }
    }
}
