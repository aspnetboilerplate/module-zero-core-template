import { Component, Injector, Inject, OnInit, Optional } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatCheckboxChange
} from '@angular/material';
import * as _ from 'lodash';
import {
  RoleServiceProxy,
  GetRoleForEditOutput,
  RoleDto,
  PermissionDto
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: 'edit-role-dialog.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
      mat-checkbox {
        padding-bottom: 5px;
      }
    `
  ]
})
export class EditRoleDialogComponent extends AppComponentBase
  implements OnInit {
  role: RoleDto = new RoleDto();
  permissions: PermissionDto[] = [];
  grantedPermissionNames: string[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  permissionName = '';
  saving = false;

  constructor(
    injector: Injector,
    private _roleService: RoleServiceProxy,
    private _dialogRef: MatDialogRef<EditRoleDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._roleService
      .getRoleForEdit(this._id)
      .subscribe((result: GetRoleForEditOutput) => {
        this.role.init(result.role);
        _.map(result.permissions, item => {
          const permission = new PermissionDto();
          permission.init(item);
          this.permissions.push(permission);
        });
        this.grantedPermissionNames = result.grantedPermissionNames;
        this.permissionName = result.role.name;
        this.setInitialPermissionsStatus();
      });
  }

  setInitialPermissionsStatus(): void {
    _.map(this.permissions, item => {
      this.checkedPermissionsMap[item.name] = _.includes(this.grantedPermissionNames, item.name);
    });
  }

  isPermissionChecked(permissionName: string): boolean {
    return _.includes(this.grantedPermissionNames, permissionName);
  }

  onPermissionChange(permission: PermissionDto, $event: MatCheckboxChange) {
    this.checkedPermissionsMap[permission.name] = $event.checked;
  }

  getCheckedPermissions(): string[] {
    const permissions: string[] = [];
    _.forEach(this.checkedPermissionsMap, function (value, key) {
      if (value) {
        permissions.push(key);
      }
    });
    return permissions;
  }

  save(): void {
    this.saving = true;

    const role = new RoleDto();
    role.permissions = this.getCheckedPermissions();
    role.init(this.role);

    this._roleService.update(role)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      ).subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close(true);
      });
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
