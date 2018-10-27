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
import SERVICE_IDENTIFIER from "src/config/identifiers";

export abstract class AbpComponentBase extends React.Component {
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

  _localization: ILocalizationService;
  _permission: IPermissionCheckerService;
  _feature: IFeatureCheckerService;
  _notify: INotifyService;
  _setting: ISettingService;
  _message: IMessageService;
  _multiTenancy: IAbpMultiTenancyService;
  _appSession: IAppSessionService;
  // elementRef: ElementRef;

  /**
   *
   */
  constructor(
    @inject(SERVICE_IDENTIFIER.ILocalizationService)
    localization: ILocalizationService,
    @inject(SERVICE_IDENTIFIER.IPermissionCheckerService)
    permission: IPermissionCheckerService,
    @inject(SERVICE_IDENTIFIER.IFeatureCheckerService)
    feature: IFeatureCheckerService,
    @inject(SERVICE_IDENTIFIER.INotifyService) notify: INotifyService,
    @inject(SERVICE_IDENTIFIER.ISettingService) setting: ISettingService,
    @inject(SERVICE_IDENTIFIER.IMessageService) message: IMessageService,
    @inject(SERVICE_IDENTIFIER.IAbpMultiTenancyService)
    multenancy: IAbpMultiTenancyService,
    @inject(SERVICE_IDENTIFIER.IAppSessionService)
    appSession: IAppSessionService
  ) {
    super(localization);

    this._localization = localization;
    this._permission = permission;
    this._feature = feature;
    this._notify = notify;
    this._setting = setting;
    this._message = message;
    this._multiTenancy = multenancy;
    this._appSession = appSession;
  }

  l(key: string, ...args: any[]): string {
    let localizedText = this._localization.localize(
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
    return this._permission.isGranted(permissionName);
  }
}
