import {
  Component,
  Injector,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import {
  UserServiceProxy,
  ResetPasswordDto,
} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
})
export class ResetPasswordDialogComponent extends AppComponentBase {
  @ViewChild('resetPasswordModal') modal: ModalDirective;

  @Output() onSave = new EventEmitter<any>();

  active = false;
  saving = false;
  resetPasswordDto: ResetPasswordDto;

  constructor(injector: Injector, private _userService: UserServiceProxy) {
    super(injector);
  }

  show(id: number) {
    this.resetPasswordDto = new ResetPasswordDto();
    this.resetPasswordDto.userId = id;
    this.resetPasswordDto.newPassword = Math.random()
      .toString(36)
      .substr(2, 10);

    this.active = true;
    this.modal.show();
  }

  public resetPassword(): void {
    this.saving = true;

    this._userService
      .resetPassword(this.resetPasswordDto)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.onSave.emit();
      });
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
