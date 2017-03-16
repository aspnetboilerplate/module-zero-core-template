import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServiceProxy, RegisterInput } from '@shared/service-proxies/service-proxies'
import { AppComponentBase } from '@shared/app-component-base';
import { LoginService } from '../login/login.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './register.component.html',
    animations: [accountModuleAnimation()]
})
export class RegisterComponent extends AppComponentBase {

    model: RegisterInput = new RegisterInput();

    saving: boolean = false;

    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _router: Router,
        private readonly _loginService: LoginService
    ) {
        super(injector);
    }


    back(): void {
        this._router.navigate(['/login']);
    }

    save(): void {
        this.saving = true;
        this._accountService.register(this.model)
            .finally(() => { this.saving = false; })
            .subscribe((result) => {
                if (!result.canLogin) {
                    this.notify.success(this.l('SuccessfullyRegistered'));
                    this._router.navigate(['/login']);
                    return;
                }

                //Autheticate
                this.saving = true;
                this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
                this._loginService.authenticateModel.password = this.model.password;
                this._loginService.authenticate(() => { this.saving = false; });
            });
    }
}