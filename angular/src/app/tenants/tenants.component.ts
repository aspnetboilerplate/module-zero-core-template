import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
    TenantServiceProxy,
    TenantDto,
    TenantDtoPagedResultDto} from '@shared/service-proxies/service-proxies';
import { CreateTenantDialogComponent } from './create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './edit-tenant/edit-tenant-dialog.component';

class PagedTenantsRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './tenants.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
      ]
})
export class TenantsComponent extends PagedListingComponentBase<TenantDto> {
    tenants: TenantDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _tenantService: TenantServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    list(
        request: PagedTenantsRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._tenantService
            .getAll(request.keyword, request.isActive, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: TenantDtoPagedResultDto) => {
                this.tenants = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(tenant: TenantDto): void {
        abp.message.confirm(
            this.l('TenantDeleteWarningMessage', tenant.name),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._tenantService
                        .delete(tenant.id)
                        .pipe(
                            finalize(() => {
                                abp.notify.success(this.l('SuccessfullyDeleted'));
                                this.refresh();
                            })
                        )
                        .subscribe(() => { });
                }
            }
        );
    }

    createTenant(): void {
        this.showCreateOrEditTenantDialog();
    }

    editTenant(tenant: TenantDto): void {
        this.showCreateOrEditTenantDialog(tenant.id);
    }

    showCreateOrEditTenantDialog(id?: number): void {
        let createOrEditTenantDialog;
        if (id === undefined || id <= 0) {
            createOrEditTenantDialog = this._dialog.open(CreateTenantDialogComponent);
        } else {
            createOrEditTenantDialog = this._dialog.open(EditTenantDialogComponent, {
                data: id
            });
        }

        createOrEditTenantDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}
