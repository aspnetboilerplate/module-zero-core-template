import AppConsts from './appconst'
export class SignalRHelper {
    static initSignalR(){

        jQuery.getScript(AppConsts.remoteServiceBaseUrl + '/signalr/hubs', () => {

            $.connection.hub.url = AppConsts.remoteServiceBaseUrl + "/signalr";

            var encryptedAuthToken = new UtilsService().getCookieValue(AppConsts.authorization.encrptedAuthTokenName);
            $.connection.hub.qs = AppConsts.authorization.encrptedAuthTokenName + "=" + encodeURIComponent(encryptedAuthToken);

            jQuery.getScript(AppConsts.appBaseUrl + '/dist/abp/abp.signalr.js');
        });
    }
}