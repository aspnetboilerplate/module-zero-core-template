import url from './url'
const AppConsts= {
    userManagement:{
        defaultAdminUserName: 'admin'
    },
    localization:{
        defaultLocalizationSourceName: 'AbpProjectName'
    },
    authorization:{
        encrptedAuthTokenName: 'enc_auth_token'
    },
    appBaseUrl: "http://localhost:8080",
    remoteServiceBaseUrl: url.endsWith('/') ? url.slice(0, -1) : url
}
export default AppConsts