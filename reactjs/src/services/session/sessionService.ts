import { GetCurrentLoginInformations } from './dto/getCurrentLoginInformations';
import http from '../httpService';

class SessionService {
  public async getCurrentLoginInformations(): Promise<GetCurrentLoginInformations> {
    var result = await http.get('api/services/app/Session/GetCurrentLoginInformations');
    console.log(result);
    return result.data;
  }
}

export default new SessionService();
