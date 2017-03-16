import { Component, Injector, AfterViewInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TenantServiceProxy, TenantListDto } from '@shared/service-proxies/service-proxies';
import { CreateTenantModalComponent } from '@app/tenants/create-tenant-modal.component';

@Component({
    templateUrl: './tenants.component.html',
    animations: [appModuleAnimation()]
})
export class TenantsComponent extends AppComponentBase {

    constructor(
        injector: Injector,
        private _tenantService: TenantServiceProxy
    ) {
        super(injector);
    }

    @ViewChild('createTenantModal') createTenantModal: CreateTenantModalComponent;
    tenants: TenantListDto[] = [];

    ngOnInit() {
        this.getTenants();
    }

    getTenants(): void {
        this._tenantService.getTenants()
            .subscribe((result) => {
                this.tenants = result.items;
            });
    }

    createTenant(): void {
        this.createTenantModal.show();
    }
}