import { AuthenticationInput } from './dto/authenticationInput';
import { AuthenticationOutput } from './dto/authenticationOutput';
import http from '../httpService';

class TokenAuth {
  public async authenticate(
    authenticationInput: AuthenticationInput,
  ): Promise<AuthenticationOutput> {
    var result = await http.get('TokenAuth/Authenticate', authenticationInput);
    console.log(result);
    return result;
  }
}

export default new TokenAuth();
