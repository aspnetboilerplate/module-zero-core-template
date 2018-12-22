import { Component, Injector, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { finalize } from "rxjs/operators";
import {
  RoleServiceProxy,
  GetRoleForEditOutput,
  RoleDto,
  FlatPermissionDto,
  RoleEditDto
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "edit-role-dialog",
  templateUrl: "edit-role-dialog.component.html",
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `
  ]
})
export class EditRoleDialogComponent extends AppComponentBase
  implements OnInit {
  active: boolean = false;
  saving: boolean = false;

  model: GetRoleForEditOutput = null;
  role: RoleEditDto = new RoleEditDto();
  permissions: FlatPermissionDto[] = [];

  constructor(
    injector: Injector,
    private _roleService: RoleServiceProxy,
    private _dialogRef: MatDialogRef<EditRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._roleService
      .getRoleForEdit(this._id)
      .pipe(
        finalize(() => {
          this.active = true;
        })
      )
      .subscribe((result: GetRoleForEditOutput) => {
        this.model = result;
        this.role = result.role;
        this.permissions = result.permissions;
      });
  }

  checkPermission(permissionName: string): boolean {
    return this.model.grantedPermissionNames.indexOf(permissionName) !== -1;
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

    const input = new RoleDto();
    input.id = this.role.id;
    input.name = this.role.name;
    input.displayName = this.role.displayName;
    input.description = this.role.description;
    input.isStatic = this.role.isStatic;
    input.permissions = this.getCheckedPermissions();

    this._roleService
      .update(input)
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
