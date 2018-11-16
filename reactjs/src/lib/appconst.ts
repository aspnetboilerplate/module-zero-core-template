const AppConsts = {
  userManagement: {
    defaultAdminUserName: 'admin',
  },
  localization: {
    defaultLocalizationSourceName: 'TR',
  },
  authorization: {
    encrptedAuthTokenName: 'enc_auth_token',
  },
  appBaseUrl: 'http://localhost:8080',
  remoteServiceBaseUrl: process.env.REACT_APP_API_URL,
};
export default AppConsts;
