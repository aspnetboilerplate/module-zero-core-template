import * as moment from 'moment';
import abpUserConfigurationService from 'src/services/abpUserConfigurationService';
import Utils from 'src/utils/utils';

export default function init() {
  setLocalization();

  abpUserConfigurationService.getAll().then(data => {
    Utils.extend(true, abp, data.data.result);
    abp.clock.provider = getCurrentClockProvider(data.data.result.clock.provider);

    moment.locale(abp.localization.currentLanguage.name);

    if (abp.clock.provider.supportsMultipleTimezone) {
      moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
    }
  });
}

function setLocalization() {
  if (!abp.utils.getCookieValue('Abp.Localization.CultureName')) {
    let language = navigator.language;
    abp.utils.setCookieValue('Abp.Localization.CultureName', language, new Date(new Date().getTime() + 5 * 365 * 86400000), abp.appPath);
  }
}

function getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {
  if (currentProviderName === 'unspecifiedClockProvider') {
    return abp.timing.unspecifiedClockProvider;
  }

  if (currentProviderName === 'utcClockProvider') {
    return abp.timing.utcClockProvider;
  }

  return abp.timing.localClockProvider;
}
