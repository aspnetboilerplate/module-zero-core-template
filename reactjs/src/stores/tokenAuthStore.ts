import { observable, action, computed } from 'mobx';
import tokenAuthService from 'src/services/tokenAuth/tokenAuthService';
import { AuthenticationResultModel } from './../services/tokenAuth/dto/authenticationResultModel';

const tokenStorageName = 'abp.AuthToken';

class TokenAuthStores {
  @observable
  public authenticateResult: AuthenticationResultModel | null;

  constructor() {
    //Kullanıcı herhangi bir nedende dolayı sayfadan cıkışşsa
    //storagedan tokenı tekrar stora almayı sağlar
    this.setToken();
  }
  @action
  getToken(): any {
    if (typeof this.authenticateResult !== undefined) return this.authenticateResult;
  }
  //false ise login olunmamıştır
  @computed
  get isAuthenticated(): boolean {
    if (this.authenticateResult === undefined || this.authenticateResult === null) return false;
    return true;
  }
  @action
  setToken() {
    // local storage if null, set null to token
    var value = window.localStorage.getItem(tokenStorageName);

    if (value !== null) {
      this.authenticateResult = JSON.parse(value);
    } else {
      this.authenticateResult = null;
    }
  }

  @action
  createToken(_token: any) {
    if (this.authenticateResult !== null) {
      this.authenticateResult = _token;
    }
  }

  @action
  public async login(userNameOrEmailAddress: string, password: string, tenancyName: string) {
    var token = await tokenAuthService.authenticate({
      userNameOrEmailAddress: userNameOrEmailAddress,
      password: password,
      rememberClient: false,
    });
    console.log(token);

    this.setLocalStorage(JSON.stringify(token));
  }
  public getBearerToken(): any {
    if (this.authenticateResult === null || this.authenticateResult === undefined) {
      this.logOut();
    } else {
      return this.authenticateResult.accessToken;
    }
  }
  public getBearerTokenForNonServices(): any {
    if (this.authenticateResult === null || this.authenticateResult === undefined) {
      return;
    } else {
      return this.authenticateResult.accessToken;
    }
  }

  setLocalStorage(input: string): void {
    window.localStorage.setItem(tokenStorageName, input);
  }

  @action
  public async logOut() {
    // clear local storage
    window.localStorage.removeItem(tokenStorageName);

    // set token undefined
    this.setToken();
  }
}

export default new TokenAuthStores();
