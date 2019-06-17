import { action, observable } from 'mobx';

import AppConsts from './../lib/appconst';
import LoginModel from '../models/Login/loginModel';
import tokenAuthService from '../services/tokenAuth/tokenAuthService';

declare var abp: any;

class AuthenticationStore {
  @observable loginModel: LoginModel = new LoginModel();

  get isAuthenticated(): boolean {
    if (!abp.session.userId) return false;

    return true;
  }

  @action
  public async login(model: LoginModel) {
    let result = await tokenAuthService.authenticate({
      userNameOrEmailAddress: model.userNameOrEmailAddress,
      password: model.password,
      rememberClient: model.rememberMe,
    });

    var tokenExpireDate = model.rememberMe ? new Date(new Date().getTime() + 1000 * result.expireInSeconds) : undefined;
    abp.auth.setToken(result.accessToken, tokenExpireDate);
    abp.utils.setCookieValue(AppConsts.authorization.encrptedAuthTokenName, result.encryptedAccessToken, tokenExpireDate, abp.appPath);
  }

  @action
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    abp.auth.clearToken();
  }
}
export default AuthenticationStore;
