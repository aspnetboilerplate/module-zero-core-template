import AppConsts from './appconst'
import Util from './util'
class SignalRAspNetCoreHelper {
    initSignalR() {
        var encryptedAuthToken = Util.abp.utils.getCookieValue(AppConsts.authorization.encrptedAuthTokenName);
        let remoteServerUrl = AppConsts.remoteServiceBaseUrl;
        Util.abp.signalr = {
            autoConnect: true,
            connect: undefined,
            hubs: undefined,
            qs: AppConsts.authorization.encrptedAuthTokenName + "=" + encodeURIComponent(encryptedAuthToken),
            remoteServiceBaseUrl: remoteServerUrl.endsWith('/') ? remoteServerUrl.slice(0, -1) : remoteServerUrl,
            url: '/signalr'
        };

        Util.loadScript(AppConsts.appBaseUrl + '/dist/abp.signalr-client.js');
    }
}
export default new SignalRAspNetCoreHelper();