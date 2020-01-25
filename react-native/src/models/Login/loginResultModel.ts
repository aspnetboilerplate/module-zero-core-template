export class LoginResultModel {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    shouldResetPassword: boolean;
    passwordResetCode?: any;
    userId: number;
    requiresTwoFactorVerification: boolean;
    twoFactorAuthProviders?: any;
    twoFactorRememberClientToken?: any;
    returnUrl?: any;
    refreshToken: string;
    refreshTokenExpireInSeconds: number;
}