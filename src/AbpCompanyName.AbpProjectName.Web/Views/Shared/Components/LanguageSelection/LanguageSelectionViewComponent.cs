using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Localization;
using Microsoft.AspNetCore.Mvc;

namespace AbpCompanyName.AbpProjectName.Web.Views.Shared.Components.LanguageSelection
{
    public class LanguageSelectionViewComponent: ViewComponent
    {
        private readonly ILocalizationManager _localizationManager;

        public LanguageSelectionViewComponent(ILocalizationManager localizationManager)
        {
            _localizationManager = localizationManager;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var model = new LanguageSelectionViewModel
            {
                CurrentLanguage = _localizationManager.CurrentLanguage,
                Languages = _localizationManager.GetAllLanguages(),
                CurrentUrl = Request.Path
            };

            return View(model);
        }
    }
}
