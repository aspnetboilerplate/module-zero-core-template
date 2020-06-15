import {
  Component,
  Injector,
  OnInit,
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
  RoleDto,
  PermissionDto,
  CreateRoleDto,
  PermissionDtoListResultDto,
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-role-dialog',
  templateUrl: 'create-role-dialog.component.html',
})
export class CreateRoleDialogComponent extends AppComponentBase
  implements OnInit {
  @ViewChild('createRoleModal') modal: ModalDirective;

  active = false;
  saving = false;
  role: RoleDto;
  permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector, private _roleService: RoleServiceProxy) {
    super(injector);
  }

  show(): void {
    this.role = new RoleDto();

    this.active = true;
    this.modal.show();
  }

  ngOnInit(): void {
    this._roleService
      .getAllPermissions()
      .subscribe((result: PermissionDtoListResultDto) => {
        this.permissions = result.items;
        this.setInitialPermissionsStatus();
      });
  }

  setInitialPermissionsStatus(): void {
    _.map(this.permissions, (item) => {
      this.checkedPermissionsMap[item.name] = this.isPermissionChecked();
    });
  }

  isPermissionChecked(): boolean {
    // just return default permission checked status
    // it's better to use a setting
    return this.defaultPermissionCheckedStatus;
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

    const role = new CreateRoleDto();
    role.init(this.role);
    role.grantedPermissions = this.getCheckedPermissions();

    this._roleService
      .create(role)
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
