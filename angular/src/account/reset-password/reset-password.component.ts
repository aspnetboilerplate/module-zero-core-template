import { Component, Injector, OnInit } from '@angular/core';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './reset-password.component.html',
    styles: [
        `
      mat-form-field {
        width: 100%;
      }
    `
    ],
    animations: [accountModuleAnimation()]
})
export class ResetPasswordComponent extends AppComponentBase implements OnInit {

    tenantId: number;
    userId: number;
    passwordResetCode: string;
    newPasswordValue: string;
    newPasswordConfirmationValue: string;
    submitting: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _accountService: AccountServiceProxy,
        injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this._route.params.subscribe((params) => {
            this.tenantId = +params['tenant-id'];
            this.userId = +params['user-id'];
            this.passwordResetCode = params['password-reset-code'];
            this.init();
        });
    }

    init() {
        this._accountService.verifyPasswordResetCode(this.tenantId, this.userId, this.passwordResetCode).subscribe((result) => {
            if (!result) {
                this._router.navigate(['/account/login']);
            }
        });
    }

    resetPassword() {
        this.submitting = true;
        this._accountService.resetPassword(this.tenantId, this.userId, this.passwordResetCode, this.newPasswordValue)
            .subscribe((result) => {
                this.submitting = false;
                this.notify.info(this.l('SavedSuccessfully'));
                this._router.navigate(['/account/login']);
            })
    }
}
