import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from '@abp/utils/utils.service';

export class SignalRAspNetCoreHelper {
    static initSignalR(): void {

        const encryptedAuthToken = new UtilsService().getCookieValue(AppConsts.authorization.encrptedAuthTokenName);

        abp.signalr = {
            autoConnect: true,
            connect: undefined,
            hubs: undefined,
            qs: AppConsts.authorization.encrptedAuthTokenName + '=' + encodeURIComponent(encryptedAuthToken),
            remoteServiceBaseUrl: AppConsts.remoteServiceBaseUrl,
            startConnection: undefined,
            url: '/signalr'
        };

        const script = document.createElement('script');
        script.src = AppConsts.appBaseUrl + '/assets/abp/abp.signalr-client.js';
        document.head.appendChild(script);
    }
}
