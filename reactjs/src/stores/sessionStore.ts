import sessionService from "src/services/session/sessionService";
import { action, observable } from 'mobx';
import { GetCurrentLoginInformations } from 'src/services/session/dto/getCurrentLoginInformations';

class RoleStores {
     @observable
     currentLoginInformations:GetCurrentLoginInformations;


    @action async getCurrentLoginInformations(){
     var result=await sessionService.getCurrentLoginInformations();
     console.log(result);
     this.currentLoginInformations=result;
  }

}

export default new RoleStores();
