

import { Component, Injector, OnInit, Inject } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateTenantDto, TenantServiceProxy, TenantDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
@Component({
    selector: 'edit-tenant-dialog',
    templateUrl: 'edit-tenant-dialog.component.html',
    styles: [`
        mat-form-field {
            width: 100%
        }
    `]
})
export class EditTenantDialogComponent extends AppComponentBase implements OnInit {

    active: boolean = false;
    saving: boolean = false;
    tenant: TenantDto = null;

    constructor(
        injector: Injector,
        public dialogRef: MatDialogRef<EditTenantDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public id: number,
        private _tenantService: TenantServiceProxy) {
        super(injector);
    }

    ngOnInit(): void {
        this._tenantService.get(this.id)
            .pipe(finalize(() => {
                this.active = true;
            }))
            .subscribe((result: TenantDto) => {
                this.tenant = result;
            });
    }

    save(): void {
        this.saving = true;
        this._tenantService.update(this.tenant)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close(true);
            })
    }

    close(result: any): void {
        this.active = false;
        this.dialogRef.close(result);
    }
}
