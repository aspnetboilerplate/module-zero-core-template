import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { TenantChangeDialogComponent } from './tenant-change-dialog.component';

@Component({
  selector: 'tenant-change',
  templateUrl: './tenant-change.component.html'
})
export class TenantChangeComponent extends AppComponentBase implements OnInit {
  tenancyName = '';
  name = '';

  constructor(injector: Injector, private _dialog: MatDialog) {
    super(injector);
  }

  ngOnInit() {
    if (this.appSession.tenant) {
      this.tenancyName = this.appSession.tenant.tenancyName;
      this.name = this.appSession.tenant.name;
    }
  }

  get isMultiTenancyEnabled(): boolean {
    return abp.multiTenancy.isEnabled;
  }

  showChangeModal(): void {
    this._dialog.open(TenantChangeDialogComponent, {
      width: '500px',
      height: '240px',
      position: {
        top: '50px'
      }
    });
  }
}
