import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateTenantDto,
  TenantServiceProxy,
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-tenant-dialog.component.html',
})
export class CreateTenantDialogComponent extends AppComponentBase
  implements OnInit {
  active = false;
  saving = false;
  tenant: CreateTenantDto = new CreateTenantDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _tenantService: TenantServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.active = true;
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
        this.close();
        this.onSave.emit();
      });
  }

  close(): void {
    this.active = false;
    this.bsModalRef.hide();
  }
}
