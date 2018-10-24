import { injectable } from "inversify";

export interface ITokenService {
  getToken(): string;
  getTokenCookieName(): string;
  clearToken(): void;
  setToken(authToken: string, expireDate?: Date): void;
}

@injectable()
export class TokenService implements ITokenService {
  getToken(): string {
    return abp.auth.getToken();
  }

  getTokenCookieName(): string {
    return abp.auth.tokenCookieName;
  }

  clearToken(): void {
    abp.auth.clearToken();
  }

  setToken(authToken: string, expireDate?: Date): void {
    abp.auth.setToken(authToken, expireDate);
  }
}
