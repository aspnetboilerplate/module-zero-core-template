import {
  Component,
  Injector,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateTenantDto,
  TenantServiceProxy,
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-tenant-dialog',
  templateUrl: 'create-tenant-dialog.component.html',
})
export class CreateTenantDialogComponent extends AppComponentBase {
  @ViewChild('createTenantModal') modal: ModalDirective;

  @Output() onSave = new EventEmitter<any>();

  active = false;
  saving = false;
  tenant: CreateTenantDto;

  constructor(injector: Injector, private _tenantService: TenantServiceProxy) {
    super(injector);
  }

  show(): void {
    this.tenant = new CreateTenantDto();
    this.tenant.isActive = true;

    this.active = true;
    this.modal.show();
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
        this.close();
        this.onSave.emit();
      });
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
