const SERVICE_IDENTIFIER = {
  IPermissionCheckerService: Symbol.for("IPermissionCheckerService"),
  ITokenService: Symbol.for("ITokenService"),
  IFeatureCheckerService: Symbol.for("IFeatureCheckerService"),
  ILocalizationService: Symbol.for("ILocalizationService"),
  ILogService: Symbol.for("ILogService"),
  IMessageService: Symbol.for("IMessageService"),
  IAbpMultiTenancyService: Symbol.for("IAbpMultiTenancyService"),
  INotifyService: Symbol.for("INotifyService"),
  IAbpSessionService: Symbol.for("IAbpSessionService"),
  IAppSessionService: Symbol.for("IAppSessionService"),
  ISettingService: Symbol.for("ISettingService"),
  IUtilsService: Symbol.for("IUtilsService"),
  IAbpUserConfigurationService: Symbol.for("IAbpUserConfigurationService")
};

export default SERVICE_IDENTIFIER;
