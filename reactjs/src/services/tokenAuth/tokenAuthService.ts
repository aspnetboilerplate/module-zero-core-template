import { AuthenticationInput } from './dto/authenticationInput';
import { AuthenticationOutput } from './dto/authenticationOutput';
import http from '../httpService';
import { urlCreator } from '../servicesUrlCreator';

class TokenAuth {
  public async authenticate(
    authenticationInput: AuthenticationInput,
  ): Promise<AuthenticationOutput> {
    var result = await http.get(
      urlCreator('TokenAuth/Authenticate', authenticationInput),
    );
    console.log(result);
    return result.data;
  }
}

export default new TokenAuth();
