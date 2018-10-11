class TokenService {
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

export default TokenService;
//newing class is making an Immediately Invoked Function Expression,
//so I can achieve Angular's Dependency Injection.
