
import http from '../httpService';
import { AuthenticateOutput } from './dto/authenticateOutput1';
import { AuthenticateInput } from './dto/authenticateInput';

class TokenAuth {
  public async authenticate(authenticationInput: AuthenticateInput): Promise<AuthenticateOutput> {
    var result = await http.post('api/TokenAuth/Authenticate', authenticationInput);
    console.log(result);
    return result.data.result;
  }
}

export default new TokenAuth();
