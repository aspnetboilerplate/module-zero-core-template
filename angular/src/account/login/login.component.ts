import { Component, Injector } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { FormsModule } from '@angular/forms';
import { AbpValidationSummaryComponent } from '../../shared/components/validation/abp-validation.summary.component';
import { RouterLink } from '@angular/router';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],
    standalone: true,
    imports: [FormsModule, AbpValidationSummaryComponent, RouterLink, LocalizePipe],
})
export class LoginComponent extends AppComponentBase {
    submitting = false;

    constructor(
        injector: Injector,
        public authService: AppAuthService,
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
        this.authService.authenticate(() => (this.submitting = false));
    }
}
