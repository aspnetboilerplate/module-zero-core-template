import { Component, Injector } from "@angular/core";
import { MatDialog } from "@angular/material";
import { finalize } from "rxjs/operators";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  RoleServiceProxy,
  RoleDto,
  PagedResultDtoOfRoleDto
} from "@shared/service-proxies/service-proxies";
import {
  PagedListingComponentBase,
  PagedRequestDto
} from "@shared/paged-listing-component-base";
import { CreateRoleDialogComponent } from "@app/roles/create-role/create-role-dialog.component";
import { EditRoleDialogComponent } from "@app/roles/edit-role/edit-role-dialog.component";

@Component({
  templateUrl: "./roles.component.html",
  animations: [appModuleAnimation()]
})
export class RolesComponent extends PagedListingComponentBase<RoleDto> {
  roles: RoleDto[] = [];

  constructor(
    injector: Injector,
    private _rolesService: RoleServiceProxy,
    private _dialog: MatDialog
  ) {
    super(injector);
  }

  list(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    //abp.ui.setBusy($("#roles-table"));

    this._rolesService
      .getAll(request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDtoOfRoleDto) => {
        this.roles = result.items;
        this.showPaging(result, pageNumber);

        //abp.ui.clearBusy($("#roles-table"));
      });
  }

  delete(role: RoleDto): void {
    abp.message.confirm(
      this.l("RoleDeleteWarningMessage", role.displayName),
      (result: boolean) => {
        if (result) {
          this._rolesService
            .delete(role.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l("SuccessfullyDeleted"));
                this.refresh();
              })
            )
            .subscribe(() => { });
        }
      }
    );
  }

  createRole(): void {
    const createRoleDialog = this._dialog.open(CreateRoleDialogComponent);
    createRoleDialog.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }

  editRole(role: RoleDto): void {
    const editRoleDialog = this._dialog.open(EditRoleDialogComponent, {
      data: role.id
    });
    editRoleDialog.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }
}
