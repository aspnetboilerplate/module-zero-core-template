import {
  Component,
  Injector,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  RoleServiceProxy,
  GetRoleForEditOutput,
  RoleDto,
  PermissionDto,
  RoleEditDto,
  FlatPermissionDto,
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'edit-role-dialog',
  templateUrl: 'edit-role-dialog.component.html',
})
export class EditRoleDialogComponent extends AppComponentBase {
  @ViewChild('editRoleModal') modal: ModalDirective;

  active = false;
  saving = false;
  role: RoleEditDto;
  permissions: FlatPermissionDto[];
  grantedPermissionNames: string[];
  checkedPermissionsMap: { [key: string]: boolean } = {};

  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector, private _roleService: RoleServiceProxy) {
    super(injector);
  }

  show(id: number): void {
    this._roleService
      .getRoleForEdit(id)
      .subscribe((result: GetRoleForEditOutput) => {
        this.role = result.role;
        this.permissions = result.permissions;
        this.grantedPermissionNames = result.grantedPermissionNames;
        this.setInitialPermissionsStatus();

        this.active = true;
        this.modal.show();
      });
  }

  setInitialPermissionsStatus(): void {
    _.map(this.permissions, (item) => {
      this.checkedPermissionsMap[item.name] = this.isPermissionChecked(
        item.name
      );
    });
  }

  isPermissionChecked(permissionName: string): boolean {
    return _.includes(this.grantedPermissionNames, permissionName);
  }

  onPermissionChange(permission: PermissionDto, $event) {
    this.checkedPermissionsMap[permission.name] = $event.target.checked;
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
    role.init(this.role);
    role.grantedPermissions = this.getCheckedPermissions();

    this._roleService
      .update(role)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.onSave.emit();
      });
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
