import * as React from "react";
import LocalizationService from "./../services/localization/localization.service";
import PermissionCheckerService from "./../services/auth/permission-checker.service";
import AppConsts from "src/lib/appconst";

export abstract class AbpComponentBase extends React.Component {
  localization = LocalizationService;
  permission = PermissionCheckerService;
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

  l(key: string, ...args: any[]): string {
    let localizedText = this.localization.localize(
      key,
      this.localizationSourceName
    );

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }

    args.unshift(localizedText);
    return abp.utils.formatString.apply(this, args);
  }

  isGranted(permissionName: string): boolean {
    return this.permission.isGranted(permissionName);
  }
}
