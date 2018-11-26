import { observable, action, computed } from 'mobx';
import { AuthenticateInput } from 'src/services/tokenAuth/dto/authenticateInput';
import { AuthenticateOutput } from 'src/services/tokenAuth/dto/authenticateOutput1';
import tokenAuthService from 'src/services/tokenAuth/tokenAuthService';


const tokenStorageName = 'abp.AuthToken';

class TokenAuthStores {

  @observable
  public authenticateResult: AuthenticateOutput | null;

  constructor() {
    this.setToken();
  }
  @action
  getToken(): any {
    if (typeof this.authenticateResult !== undefined) return this.authenticateResult;
  }
  

  @computed
  get isAuthenticated(): boolean {
    if (this.authenticateResult === undefined || this.authenticateResult === null) return false;
    return true;
  }

  @action
  setToken() {
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
  public async authenticate(authenticateInput:AuthenticateInput) {
  
    var token = await tokenAuthService.authenticate(authenticateInput);
    ;
    console.log(token);
    this.setLocalStorage(JSON.stringify(token));
    this.authenticateResult = token;    
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
