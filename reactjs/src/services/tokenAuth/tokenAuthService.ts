import { AuthenticationModel } from './dto/authenticationModel';
import { AuthenticationResultModel } from './dto/authenticationResultModel';
import http from '../httpService';

class TokenAuthService {
  public async authenticate(authenticationInput: AuthenticationModel): Promise<AuthenticationResultModel> {
    var result = await http.post('api/TokenAuth/Authenticate', authenticationInput);
    console.log(result);
    return result.data.result;
  }
}

export default new TokenAuthService();
