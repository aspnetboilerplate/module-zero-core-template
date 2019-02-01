import { Injectable } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';

@Injectable()
export class AppAuthService {

    logout(reload?: boolean): void {
        abp.auth.clearToken();
		abp.utils.setCookieValue(AppConsts.authorization.encrptedAuthTokenName, undefined, undefined, abp.appPath);
        if (reload !== false) {
            location.href = AppConsts.appBaseUrl;
        }
    }
}
