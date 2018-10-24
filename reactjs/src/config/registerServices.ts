import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "src/config/identifiers";
import {
  IPermissionCheckerService,
  PermissionCheckerService
} from "src/services/auth/permissionCheckerService";
import { ITokenService, TokenService } from "./../services/auth/tokenService";
import {
  IFeatureCheckerService,
  FeatureCheckerService
} from "src/services/features/featureCheckerService";
import {
  ILocalizationService,
  LocalizationService
} from "./../services/localization/localizationService";
import { ILogService, LogService } from "src/services/log/logService";
import {
  IMessageService,
  MessageService
} from "./../services/message/messageService";
import {
  IAbpMultiTenancyService,
  AbpMultiTenancyService
} from "src/services/multiTenancy/abpMultiTenancyService";
import {
  INotifyService,
  NotifyService
} from "src/services/notify/notifyService";
import {
  IAbpSessionService,
  AbpSessionService
} from "./../services/session/abpSessionService";
import {
  AppSessionService,
  IAppSessionService
} from "./../services/session/appSessionService";
import {
  ISettingService,
  SettingService
} from "src/services/settings/settingService";
import { IUtilsService, UtilsService } from "./../services/utils/utilsService";
import {
  IAbpUserConfigurationService,
  AbpUserConfigurationService
} from "./../services/abpUserConfigurationService";

let container = new Container();

container
  .bind<IPermissionCheckerService>(SERVICE_IDENTIFIER.IPermissionCheckerService)
  .to(PermissionCheckerService);
container
  .bind<ITokenService>(SERVICE_IDENTIFIER.ITokenService)
  .to(TokenService);
container
  .bind<IFeatureCheckerService>(SERVICE_IDENTIFIER.IFeatureCheckerService)
  .to(FeatureCheckerService);
container
  .bind<ILocalizationService>(SERVICE_IDENTIFIER.ILocalizationService)
  .to(LocalizationService);
container.bind<ILogService>(SERVICE_IDENTIFIER.ILogService).to(LogService);
container
  .bind<IMessageService>(SERVICE_IDENTIFIER.IMessageService)
  .to(MessageService);
container
  .bind<IAbpMultiTenancyService>(SERVICE_IDENTIFIER.IAbpMultiTenancyService)
  .to(AbpMultiTenancyService);
container
  .bind<INotifyService>(SERVICE_IDENTIFIER.INotifyService)
  .to(NotifyService);
container
  .bind<IAbpSessionService>(SERVICE_IDENTIFIER.IAbpSessionService)
  .to(AbpSessionService);
container
  .bind<IAppSessionService>(SERVICE_IDENTIFIER.IAppSessionService)
  .to(AppSessionService);
container
  .bind<ISettingService>(SERVICE_IDENTIFIER.ISettingService)
  .to(SettingService);
container
  .bind<IUtilsService>(SERVICE_IDENTIFIER.IUtilsService)
  .to(UtilsService);
container
  .bind<IAbpUserConfigurationService>(
    SERVICE_IDENTIFIER.IAbpUserConfigurationService
  )
  .to(AbpUserConfigurationService);

export default container;
