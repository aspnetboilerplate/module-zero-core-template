class AppConsts {
  static remoteServiceBaseUrl: string;
  static appBaseUrl: string;
  static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

  static localeMappings: any = [];

  static readonly userManagement = {
    defaultAdminUserName: "admin"
  };

  static readonly localization = {
    defaultLocalizationSourceName: "AbpProjectName"
  };

  static readonly authorization = {
    encrptedAuthTokenName: "enc_auth_token"
  };
}

export default AppConsts;
