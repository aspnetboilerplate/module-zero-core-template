import { Component, Injector } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppTenantAvailabilityState } from '@shared/AppEnums';
import {
    IsTenantAvailableInput,
    IsTenantAvailableOutput
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './reset-password-dialog.component.html',
    styles: [
        `
      mat-form-field {
        width: 100%;
      }
    `
    ]
})
export class ResetPasswordDialogComponent extends AppComponentBase {
    saving = false;
    userNameOrEmailAddress = '';

    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _dialogRef: MatDialogRef<ResetPasswordDialogComponent>
    ) {
        super(injector);
    }

    save(): void {
        this.saving = true;
        this._accountService.sendPasswordResetEmail(this.userNameOrEmailAddress).subscribe((result) => {
            this.notify.info(
                this.l('PasswordResetEmailSentSucessfullyMessage'),
                this.l('PasswordResetEmailSentSucessfullyTitle'));
            this.saving = false;
            this.close();
        });
    }

    close(result?: any): void {
        this._dialogRef.close(result);
    }
}
