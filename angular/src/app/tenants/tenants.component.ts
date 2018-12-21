import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TenantServiceProxy, TenantDto, PagedResultDtoOfTenantDto } from '@shared/service-proxies/service-proxies';

import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CreateTenantDialogComponent } from './create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './edit-tenant/edit-tenant-dialog.component';

@Component({
    templateUrl: './tenants.component.html',
    animations: [appModuleAnimation()]
})
export class TenantsComponent extends PagedListingComponentBase<TenantDto> {

    tenants: TenantDto[] = [];

    constructor(
        injector: Injector,
        public dialog: MatDialog,
        private _tenantService: TenantServiceProxy
    ) {
        super(injector);
    }

    list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._tenantService.getAll(request.skipCount, request.maxResultCount)
            .pipe(finalize(() => { finishedCallback() }))
            .subscribe((result: PagedResultDtoOfTenantDto) => {
                this.tenants = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(tenant: TenantDto): void {
        abp.message.confirm(
            "Delete tenant '" + tenant.name + "'?",
            (result: boolean) => {
                if (result) {
                    this._tenantService.delete(tenant.id)
                        .pipe(finalize(() => {
                            abp.notify.info("Deleted tenant: " + tenant.name);
                            this.refresh();
                        }))
                        .subscribe(() => { });
                }
            }
        );
    }

    // Show modals
    createTenant(): void {
        const createTenantDialog = this.dialog.open(CreateTenantDialogComponent);
        createTenantDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        })
    }

    editTenant(tenant: TenantDto): void {
        const editTenantDialog = this.dialog.open(EditTenantDialogComponent, {
            data: tenant.id
        });
        editTenantDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        })
    }
}
