import * as React from 'react';
import AppConsts from 'src/lib/appconst';

class AppBaseComponent extends React.Component {
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

  L(key: string, sourceName?: string): string {
    return abp.localization.localize(key, sourceName ? sourceName : this.localizationSourceName);
  }

  isGranted(permissionName: string): boolean {
    return abp.auth.isGranted(permissionName);
  }
}

export default AppBaseComponent;
