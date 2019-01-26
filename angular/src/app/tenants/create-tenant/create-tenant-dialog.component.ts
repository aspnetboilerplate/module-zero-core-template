import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateTenantDto,
  TenantServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-tenant-dialog.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
      mat-checkbox {
        padding-bottom: 5px;
      }
    `
  ]
})
export class CreateTenantDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  tenant: CreateTenantDto = new CreateTenantDto();

  constructor(
    injector: Injector,
    public _tenantService: TenantServiceProxy,
    private _dialogRef: MatDialogRef<CreateTenantDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.tenant.isActive = true;
  }

  save(): void {
    this.saving = true;

    this._tenantService
      .create(this.tenant)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close(true);
      });
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
