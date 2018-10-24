import { injectable } from "inversify";

export interface ILocalizationService {
  languages(): abp.localization.ILanguageInfo[];
  currentLanguage(): abp.localization.ILanguageInfo;
  localize(key: string, sourceName: string): string;
  getSource(sourceName: string): (key: string) => string;
}

@injectable()
export class LocalizationService implements ILocalizationService {
  languages(): abp.localization.ILanguageInfo[] {
    return abp.localization.languages;
  }

  currentLanguage(): abp.localization.ILanguageInfo {
    return abp.localization.currentLanguage;
  }

  localize(key: string, sourceName: string): string {
    return abp.localization.localize(key, sourceName);
  }

  getSource(sourceName: string): (key: string) => string {
    return abp.localization.getSource(sourceName);
  }
}
