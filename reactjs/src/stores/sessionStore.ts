import sessionService from '@app/services/session/sessionService';
import { action, observable } from 'mobx';
import { GetCurrentLoginInformations } from '@app/services/session/dto/getCurrentLoginInformations';

class SessionStore {
  @observable currentLogin: GetCurrentLoginInformations = new GetCurrentLoginInformations();

  @action
  async getCurrentLoginInformations() {
    let result = await sessionService.getCurrentLoginInformations();
    this.currentLogin = result;
  }
}

export default SessionStore;
