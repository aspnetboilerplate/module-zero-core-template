export interface AuthenticationOutputItems {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
  userId: number;
}

export interface AuthenticationOutput {
  result: AuthenticationOutputItems;
}
