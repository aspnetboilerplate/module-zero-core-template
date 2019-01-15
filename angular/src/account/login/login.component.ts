﻿import { Component, Injector } from '@angular/core';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material';
import { ResetPasswordDialogComponent } from 'account/reset-password/reset-password-dialog.component';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
  submitting: boolean = false;

  constructor(
    injector: Injector,
    public loginService: LoginService,
    private _sessionService: AbpSessionService,
    private _dialog: MatDialog
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

  resetPassword(): void {
    this._dialog.open(ResetPasswordDialogComponent, {
      width: '500px',
      position: {
        top: '50px'
      }
    });
  }
}
