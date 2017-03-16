import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from '@abp/utils/utils.service';

export class SignalRHelper {
    static initSignalR(): void {

        jQuery.getScript(AppConsts.remoteServiceBaseUrl + '/signalr/hubs', () => {

            $.connection.hub.url = AppConsts.remoteServiceBaseUrl + "/signalr";

            var encryptedAuthToken = new UtilsService().getCookieValue(AppConsts.authorization.encrptedAuthTokenName);
            $.connection.hub.qs = AppConsts.authorization.encrptedAuthTokenName + "=" + encodeURIComponent(encryptedAuthToken);

            jQuery.getScript(AppConsts.appBaseUrl + '/assets/abp/abp.signalr.js');
        });
    }
}