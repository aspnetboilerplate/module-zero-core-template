import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { SettingDto, TenantSettingsServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-tenant-settings',
  templateUrl: './tenant-settings.component.html',
  styleUrls: ['./tenant-settings.component.css'],
  animations: [appModuleAnimation()]
})
export class TenantSettingsComponent extends AppComponentBase implements OnInit {
  settings: SettingDto[] = [];
  constructor(injector: Injector, private service: TenantSettingsServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    abp.ui.setBusy();

    this.service.getAll()
      .pipe(finalize(() => {
        abp.ui.clearBusy();
      }))
      .subscribe(ff => this.settings = ff);
  }

  save() {
    this.service.change(this.settings)
      .pipe(finalize(() => {
        abp.ui.clearBusy();
      }))
      .subscribe(() => abp.notify.success(this.l("SavedSuccessfull")));
  }

}
