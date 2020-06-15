import { Component, Injector, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  RoleServiceProxy,
  RoleDto,
  RoleDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import { CreateRoleDialogComponent } from './create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './edit-role/edit-role-dialog.component';

class PagedRolesRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './roles.component.html',
  animations: [appModuleAnimation()],
})
export class RolesComponent extends PagedListingComponentBase<RoleDto> {
  @ViewChild('createRoleDialog')
  createRoleDialog: CreateRoleDialogComponent;
  @ViewChild('editRoleDialog')
  editRoleDialog: EditRoleDialogComponent;

  roles: RoleDto[] = [];
  keyword = '';

  constructor(injector: Injector, private _rolesService: RoleServiceProxy) {
    super(injector);
  }

  list(
    request: PagedRolesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._rolesService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: RoleDtoPagedResultDto) => {
        this.roles = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(role: RoleDto): void {
    abp.message.confirm(
      this.l('RoleDeleteWarningMessage', role.displayName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._rolesService
            .delete(role.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }
}
