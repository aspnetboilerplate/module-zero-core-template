import { Component, Injector, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppTenantAvailabilityState } from '@shared/AppEnums';
import {
  IsTenantAvailableInput,
  IsTenantAvailableOutput,
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './tenant-change-dialog.component.html',
})
export class TenantChangeDialogComponent extends AppComponentBase
  implements OnInit {
  active = false;
  saving = false;
  tenancyName = '';

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.active = true;
  }

  save(): void {
    if (!this.tenancyName) {
      abp.multiTenancy.setTenantIdCookie(undefined);
      this.close();
      location.reload();
      return;
    }

    const input = new IsTenantAvailableInput();
    input.tenancyName = this.tenancyName;

    this.saving = true;
    this._accountService
      .isTenantAvailable(input)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result: IsTenantAvailableOutput) => {
        switch (result.state) {
          case AppTenantAvailabilityState.Available:
            abp.multiTenancy.setTenantIdCookie(result.tenantId);
            this.close();
            location.reload();
            return;
          case AppTenantAvailabilityState.InActive:
            this.message.warn(this.l('TenantIsNotActive', this.tenancyName));
            break;
          case AppTenantAvailabilityState.NotFound:
            this.message.warn(
              this.l('ThereIsNoTenantDefinedWithName{0}', this.tenancyName)
            );
            break;
        }
      });
  }

  close(): void {
    this.active = false;
    this.bsModalRef.hide();
  }
}
