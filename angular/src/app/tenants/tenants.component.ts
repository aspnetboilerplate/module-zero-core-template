import { Component, Injector, AfterViewInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TenantServiceProxy, TenantDto } from '@shared/service-proxies/service-proxies';

import { PagedListingComponentBase, PagedRequestDto, EntityDto } from "shared/paged-listing-component-base";
import { EditTenantComponent } from "app/tenants/edit-tenant/edit-tenant.component";
import { CreateTenantComponent } from "app/tenants/create-tenant/create-tenant.component";

@Component({
    templateUrl: './tenants.component.html',
    animations: [appModuleAnimation()]
})
export class TenantsComponent extends PagedListingComponentBase<TenantDto> {

    @ViewChild('createTenantModal') createTenantModal: CreateTenantComponent;
    @ViewChild('editTenantModal') editTenantModal: EditTenantComponent;

    tenants: TenantDto[] = [];

    constructor(
        injector: Injector,
        private _tenantService: TenantServiceProxy
    ) {
        super(injector);
    }

    protected getUIPanelSelector(): string {
        return "div.main-content>>table";
    }

	toggleActive(tenant:TenantDto): void {
        let newStatus = (!tenant.isActive?'active':'in-active');
		abp.message.confirm(
			"Change tenant '" + tenant.tenancyName + "' to " + newStatus,
			(result:boolean) => {
				if(result) {
					this._tenantService.get(tenant.id)
						.finally(()=>{})
						.subscribe((result)=>{
							result.isActive = !result.isActive
							
							// update
							this._tenantService.update(result)
									.finally(()=>{
										this.refresh();
									})
									.subscribe((result)=>{
                                        var statusFromServer =  (result.isActive ? 'active' : 'in-active')
                                        abp.message.success("Tenant '"+result.tenancyName+"' is now '" + statusFromServer + "'", "Tenant status updated" );
                                    });
						});
				}
			}
		);
	}

    list(request:PagedRequestDto, pageNumber:number, finishedCallback: Function): void {
        this._tenantService.getAll(request.skipCount, request.maxResultCount)
            .finally(()=>{
                finishedCallback();
            })
            .subscribe((result)=>{
				this.tenants = result.items;
				this.showPaging(result, pageNumber);
            });
    }

    delete(tenant: TenantDto): void {
		abp.message.confirm(
			"Delete tenant '"+ tenant.name +"'?",
			(result:boolean) => {
				if(result) {
					this._tenantService.delete(tenant.id)
						.finally(() => {
							abp.message.success("Deleted tenant: " + tenant.name );
							this.refresh();
						})
						.subscribe(() => {
						});
				}
			}
		);
    }

    // Show modals
    createTenant(): void {
        this.createTenantModal.show();
    }

    editTenant(tenant:TenantDto): void{
        this.editTenantModal.show(tenant.id);
    }
}