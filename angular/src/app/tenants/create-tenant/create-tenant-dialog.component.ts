

import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CreateTenantDto, TenantServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
@Component({
    selector: 'create-tenant-dialog',
    templateUrl: 'create-tenant-dialog.component.html',
    styles: [`
        mat-form-field {
            width: 100%
        }
    `]
})
export class CreateTenantDialogComponent extends AppComponentBase implements OnInit {

    saving: boolean = false;
    tenant: CreateTenantDto = null;

    constructor(
        injector: Injector,
        public dialogRef: MatDialogRef<CreateTenantDialogComponent>,
        private _tenantService: TenantServiceProxy) {
        super(injector);
    }

    ngOnInit(): void {
        this.tenant = new CreateTenantDto();
        this.tenant.isActive = true;
    }

    save(): void {
        this.saving = true;
        this._tenantService.create(this.tenant)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close(true);
            })
    }

    close(result: any): void {
        this.dialogRef.close(result);
    }
}
