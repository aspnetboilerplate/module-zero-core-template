import { Component, OnInit, Injector, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { ChangePasswordDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormGroupDirective, NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';

export class FormGroupErrorStateMatcher implements ErrorStateMatcher {
    constructor(private formGroup: FormGroup) { }

    public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control && control.dirty && control.touched && this.formGroup && this.formGroup.errors && this.formGroup.errors.areEqual;
    }
}

@Component({
    animations: [appModuleAnimation()],
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent extends AppComponentBase implements OnInit {

    private static areEqual(c: AbstractControl): ValidationErrors | null {
        const keys: string[] = Object.keys(c.value);
        for (const i in keys) {
            if (i !== '0' && c.value[keys[+i - 1]] !== c.value[keys[i]]) {
                return { areEqual: true };
            }
        }
    }
    public parentFormGroup: FormGroup;
    public passwordsFormGroup: FormGroup;
    public isLoading: boolean;
    public equalMatcher: FormGroupErrorStateMatcher;

    public constructor(
        injector: Injector,
        private userServiceProxy: UserServiceProxy,
        private router: Router
    ) {
        super(injector);
    }

    public ngOnInit() {
        this.isLoading = true;

        this.passwordsFormGroup = new FormGroup({
            'newPassword': new FormControl('', [
                Validators.required,
                Validators.pattern('(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s)[0-9a-zA-Z!@#$%^&*()]*$') ]),
            'repeatNewPassword': new FormControl('', [ Validators.required ])
        }, ChangePasswordComponent.areEqual);

        this.parentFormGroup = new FormGroup({
            'currentPassword': new FormControl('', [ Validators.required ]),
            'passwords': this.passwordsFormGroup
        });

        this.equalMatcher = new FormGroupErrorStateMatcher(this.passwordsFormGroup);

        this.doneLoading();
    }

    public updatePassword(formValue: any) {
        const changePasswordDto = new ChangePasswordDto();
        changePasswordDto.currentPassword = formValue.currentPassword;
        changePasswordDto.newPassword = formValue.passwords.newPassword;

        this.isLoading = true;
        this.userServiceProxy.changePassword(changePasswordDto)
        .pipe(
            finalize(() => {
                this.doneLoading();
            })
        )
        .subscribe(success => {
            if (success) {
                abp.message.success('Password changed successfully', 'Success');
                this.router.navigate(['/']);
            }
        });
    }

    private doneLoading(): void {
        this.isLoading = false;
    }
}
