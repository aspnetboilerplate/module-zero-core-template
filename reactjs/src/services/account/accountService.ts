import { IsTenantAvaibleInput } from './dto/isTenantAvailableInput';
import { RegisterInput } from './dto/registerInput';
import { IsTenantAvaibleOutput } from './dto/isTenantAvailableOutput';
import { RegisterOutput } from './dto/registerOutput';
import http from '../httpService';

class AccountService {
  public async isTenantAvailable(
    isTenantAvaibleInput: IsTenantAvaibleInput,
  ): Promise<IsTenantAvaibleOutput> {
    var result = await http.post(
      'services/app/Account/IsTenantAvailable',
      isTenantAvaibleInput,
    );
    console.log(result);
    return result.data;
  }
  public async register(registerInput: RegisterInput): Promise<RegisterOutput> {
    var result = await http.post(
      'services/app/Account/Register',
      registerInput
    );
    console.log(result);
    return result.data;
  }
}

export default new AccountService();
