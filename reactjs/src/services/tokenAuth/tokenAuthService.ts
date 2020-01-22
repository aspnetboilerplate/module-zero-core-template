import { AuthenticationModel } from './dto/authenticationModel';
import { AuthenticationResultModel } from './dto/authenticationResultModel';
import http from '../httpService';
import { AuthenticateOutput } from './dto/authenticateOutput1';
import { AuthenticateInput } from './dto/authenticateInput';

class TokenAuthService {
  public async authenticate(authenticationInput: AuthenticationModel): Promise<AuthenticationResultModel> {
    let result = await http.post('api/TokenAuth/Authenticate', authenticationInput);
    return result.data.result;
  }
}

export default new TokenAuthService();
