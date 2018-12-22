import { Component, Injector, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { finalize } from "rxjs/operators";
import {
  RoleServiceProxy,
  CreateRoleDto,
  ListResultDtoOfPermissionDto,
  PermissionDto
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "create-role-dialog",
  templateUrl: "create-role-dialog.component.html",
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `
  ]
})
export class CreateRoleDialogComponent extends AppComponentBase
  implements OnInit {
  active: boolean = false;
  saving: boolean = false;

  role: CreateRoleDto = new CreateRoleDto();
  permissions: PermissionDto[] = [];

  constructor(
    injector: Injector,
    private _roleService: RoleServiceProxy,
    private _dialogRef: MatDialogRef<CreateRoleDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._roleService
      .getAllPermissions()
      .subscribe((permissions: ListResultDtoOfPermissionDto) => {
        this.active = true;
        this.permissions = permissions.items;
      });
  }

  checkPermission(permissionName: string): boolean {
    // return default permission check state
    return true;
  }

  getCheckedPermissions(): string[] {
    const permissions = <string[]>[];
    $(this._dialogRef["_containerInstance"]["_elementRef"].nativeElement)
      .find("[name=permission]")
      .each(function(index: number, elem: Element) {
        if ($(elem).is(":checked") === true) {
          permissions.push(elem.getAttribute("value").valueOf());
        }
      });
    return permissions;
  }

  save(): void {
    this.saving = true;

    this.role.permissions = this.getCheckedPermissions();

    this._roleService
      .create(this.role)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.close(true);
      });
  }

  close(result: any): void {
    this.active = false;
    this._dialogRef.close(result);
  }
}
