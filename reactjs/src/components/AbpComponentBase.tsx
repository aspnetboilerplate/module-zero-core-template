import * as React from "react";
import { ILocalizationService } from "src/services/localization/localizationService";
import { IPermissionCheckerService } from "src/services/auth/permissionCheckerService";
import AppConsts from "src/lib/appconst";
import { IFeatureCheckerService } from "src/services/features/featureCheckerService";
import { INotifyService } from "src/services/notify/notifyService";
import { ISettingService } from "src/services/settings/settingService";
import { IMessageService } from "src/services/message/messageService";
import { IAbpMultiTenancyService } from "src/services/multiTenancy/abpMultiTenancyService";
import { inject } from "inversify";
import { IAppSessionService } from "src/services/session/appSessionService";

export abstract class AbpComponentBase extends React.Component {
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

  localization: ILocalizationService;
  permission: IPermissionCheckerService;
  feature: IFeatureCheckerService;
  notify: INotifyService;
  setting: ISettingService;
  message: IMessageService;
  multiTenancy: IAbpMultiTenancyService;
  appSession: IAppSessionService;
  // elementRef: ElementRef;

  /**
   *
   */
  constructor() {
    super();
  }

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
