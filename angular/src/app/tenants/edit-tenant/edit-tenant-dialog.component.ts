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
  TenantDto,
  TenantServiceProxy,
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'edit-tenant-dialog',
  templateUrl: 'edit-tenant-dialog.component.html',
})
export class EditTenantDialogComponent extends AppComponentBase {
  @ViewChild('editTenantModal') modal: ModalDirective;

  active = false;
  saving = false;
  tenant: TenantDto;

  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector, private _tenantService: TenantServiceProxy) {
    super(injector);
  }

  show(id: number): void {
    this._tenantService.get(id).subscribe((result: TenantDto) => {
      this.tenant = result;

      this.active = true;
      this.modal.show();
    });
  }

  save(): void {
    this.saving = true;

    this._tenantService
      .update(this.tenant)
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
