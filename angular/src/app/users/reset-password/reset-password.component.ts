import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UserServiceProxy, ResetPasswordDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    standalone: true,
    imports: [
        FormsModule,
        AbpModalHeaderComponent,
        AbpValidationSummaryComponent,
        AbpModalFooterComponent,
        LocalizePipe,
    ],
})
export class ResetPasswordDialogComponent extends AppComponentBase implements OnInit {
    public isLoading = false;
    public resetPasswordDto: ResetPasswordDto;
    id: number;

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit() {
        this.isLoading = true;
        this.resetPasswordDto = new ResetPasswordDto();
        this.resetPasswordDto.userId = this.id;
        this.resetPasswordDto.newPassword = Math.random().toString(36).substr(2, 10);
        this.isLoading = false;
    }

    public resetPassword(): void {
        this.isLoading = true;
        this._userService.resetPassword(this.resetPasswordDto).subscribe(
            () => {
                this.notify.info('Password Reset');
                this.bsModalRef.hide();
            },
            () => {
                this.isLoading = false;
            }
        );
    }
}
