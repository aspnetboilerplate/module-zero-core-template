import { Component, Injector } from '@angular/core';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { AppComponentBase } from '@shared/app-component-base';
import { LoginService } from './login.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  templateUrl: './login.component.html',
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
  submitting = false;

  constructor(
    injector: Injector,
    public loginService: LoginService,
    private _sessionService: AbpSessionService
  ) {
    super(injector);
  }

  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {
    this.submitting = true;
    this.loginService.authenticate(() => (this.submitting = false));
  }
}
