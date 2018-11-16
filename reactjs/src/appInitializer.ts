import * as moment from 'moment';
import { initialize } from 'src/services/abpUserConfigurationService';
import Utils from 'src/utils/utils';

export default function init() {
  initialize().then(data => {
    Utils.extend(true, abp, data.data.result);
    abp.clock.provider = getCurrentClockProvider(data.data.result.clock.provider);

    moment.locale(abp.localization.currentLanguage.name);

    if (abp.clock.provider.supportsMultipleTimezone) {
      moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
    }
  });
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
