import { GetCurrentLoginInformations } from './dto/getCurrentLoginInformations';
import http from '../httpService';

declare var abp: any;

class SessionService {
  public async getCurrentLoginInformations(): Promise<GetCurrentLoginInformations> {
    let result = await http.get('api/services/app/Session/GetCurrentLoginInformations', {
      headers: {
        'Abp.TenantId': abp.multiTenancy.getTenantIdCookie(),
      },
    });

    return result.data.result;
  }
}

export default new SessionService();
