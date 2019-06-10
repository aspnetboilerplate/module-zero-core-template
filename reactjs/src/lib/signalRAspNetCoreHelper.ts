import AppConsts from './appconst';
import Util from '../utils/utils';

declare var abp: any;

class SignalRAspNetCoreHelper {
  initSignalR() {
    var encryptedAuthToken = abp.utils.getCookieValue(AppConsts.authorization.encrptedAuthTokenName);

    abp.signalr = {
      autoConnect: true,
      connect: undefined,
      hubs: undefined,
      qs: AppConsts.authorization.encrptedAuthTokenName + '=' + encodeURIComponent(encryptedAuthToken),
      url: AppConsts.remoteServiceBaseUrl + '/signalr',
    };

    Util.loadScript(AppConsts.appBaseUrl + '/dist/abp.signalr-client.js');
  }
}
export default new SignalRAspNetCoreHelper();
