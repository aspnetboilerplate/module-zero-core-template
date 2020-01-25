import { action, observable } from 'mobx';

import { GetCurrentLoginInformations } from '../services/session/dto/getCurrentLoginInformations';
import sessionService from '../services/session/sessionService';

class SessionStore {
  @observable currentLogin: GetCurrentLoginInformations = new GetCurrentLoginInformations();

  @action
  async getCurrentLoginInformations() {
    let result = await sessionService.getCurrentLoginInformations();
    this.currentLogin = result;
  }
}

export default SessionStore;
