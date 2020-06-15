import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { TenantChangeDialogComponent } from './tenant-change-dialog.component';

@Component({
  selector: 'tenant-change',
  templateUrl: './tenant-change.component.html',
})
export class TenantChangeComponent extends AppComponentBase implements OnInit {
  @ViewChild('tenantChangeDialog')
  tenantChangeDialog: TenantChangeDialogComponent;

  tenancyName = '';
  name = '';

  constructor(injector: Injector) {
    super(injector);
  }

  get isMultiTenancyEnabled(): boolean {
    return abp.multiTenancy.isEnabled;
  }

  ngOnInit() {
    if (this.appSession.tenant) {
      this.tenancyName = this.appSession.tenant.tenancyName;
      this.name = this.appSession.tenant.name;
    }
  }

  showChangeModal(): void {
    if (this.appSession.tenant) {
      this.tenantChangeDialog.tenancyName = this.appSession.tenant.tenancyName;
    }

    this.tenantChangeDialog.show();
  }
}
