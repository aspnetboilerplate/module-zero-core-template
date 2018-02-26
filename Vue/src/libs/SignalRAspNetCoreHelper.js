import AppConsts from './appconst'
class SignalRAspNetCoreHelper{
    initSignalR(){
        var encryptedAuthToken = abp.utils.getCookieValue(AppConsts.authorization.encrptedAuthTokenName);

        abp.signalr = {
            autoConnect: true,
            connect: undefined,
            hubs: undefined,
            qs: AppConsts.authorization.encrptedAuthTokenName + "=" + encodeURIComponent(encryptedAuthToken),
            url: AppConsts.remoteServiceBaseUrl + '/signalr'
        };

        jQuery.getScript(AppConsts.appBaseUrl + '/dist/abp/abp.signalr-client.js');
    }
}
export default new SignalRAspNetCoreHelper();