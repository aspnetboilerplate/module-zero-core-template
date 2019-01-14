import { Component, OnInit, Optional, Injector, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import {
  UserServiceProxy,
  ResetPasswordDto
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordDialogComponent extends AppComponentBase
  implements OnInit {
  public isLoading = false;
  public resetPasswordDto: ResetPasswordDto;

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private _dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _userId: number
  ) {
    super(injector);
  }

  ngOnInit() {
    this.isLoading = true;
    this.resetPasswordDto = new ResetPasswordDto();
    this.resetPasswordDto.userId = this._userId;
    this.resetPasswordDto.newPassword = Math.random()
      .toString(36)
      .substr(2, 10);
    this.isLoading = false;
  }

  public resetPassword(): void {
    this.isLoading = true;
    this._userService
      .resetPassword(this.resetPasswordDto)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.notify.info('Password Reset');
        this.close(true);
      });
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
