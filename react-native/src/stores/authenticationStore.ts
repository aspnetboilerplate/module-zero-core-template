import { action, observable } from 'mobx';


import LoginModel from '../models/Login/loginModel';
import tokenAuthService from '../services/tokenAuth/tokenAuthService';





class AuthenticationStore {
  @observable loginModel: LoginModel = new LoginModel();

   isAuthenticated(): boolean {
    // if (!abp.session.userId) return false;

    return true;
  }

  @action
  public async login(model: LoginModel) {
    let result = await tokenAuthService.authenticate({
      userNameOrEmailAddress: model.userNameOrEmailAddress,
      password: model.password,
      rememberClient: model.rememberMe,
    });

  }

  @action
  logout() {
   
  }
}
export default AuthenticationStore;
