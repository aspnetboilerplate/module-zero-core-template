import { action, observable } from 'mobx';

import IsTenantAvaibleOutput from '../services/account/dto/isTenantAvailableOutput';
import accountService from '../services/account/accountService';

class AccountStore {
  @observable tenant: IsTenantAvaibleOutput = new IsTenantAvaibleOutput();

  @action
  public isTenantAvailable = async (tenancyName: string) => {
    this.tenant = await accountService.isTenantAvailable({ tenancyName: tenancyName });
  };
}

export default AccountStore;
