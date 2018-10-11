class LocalizationService {
  get languages(): abp.localization.ILanguageInfo[] {
    return abp.localization.languages;
  }

  get currentLanguage(): abp.localization.ILanguageInfo {
    return abp.localization.currentLanguage;
  }

  localize(key: string, sourceName: string): string {
    return abp.localization.localize(key, sourceName);
  }

  getSource(sourceName: string): (key: string) => string {
    return abp.localization.getSource(sourceName);
  }
}

export default new LocalizationService();
//newing class is making an Immediately Invoked Function Expression,
//so I can achieve Angular's Dependency Injection.
