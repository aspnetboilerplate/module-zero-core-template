import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
    RoleServiceProxy,
    GetRoleForEditOutput,
    RoleDto,
    PermissionDto,
    RoleEditDto,
    FlatPermissionDto,
} from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    templateUrl: 'edit-role-dialog.component.html',
    standalone: true,
    imports: [
        FormsModule,
        AbpModalHeaderComponent,
        TabsetComponent,
        TabDirective,
        AbpValidationSummaryComponent,
        AbpModalFooterComponent,
        LocalizePipe,
    ],
})
export class EditRoleDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<any>();

    saving = false;
    id: number;
    role = new RoleEditDto();
    permissions: FlatPermissionDto[];
    grantedPermissionNames: string[];
    checkedPermissionsMap: { [key: string]: boolean } = {};

    constructor(
        injector: Injector,
        private _roleService: RoleServiceProxy,
        public bsModalRef: BsModalRef,
        private cd: ChangeDetectorRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._roleService.getRoleForEdit(this.id).subscribe((result: GetRoleForEditOutput) => {
            this.role = result.role;
            this.permissions = result.permissions;
            this.grantedPermissionNames = result.grantedPermissionNames;
            this.setInitialPermissionsStatus();
            this.cd.detectChanges();
        });
    }

    setInitialPermissionsStatus(): void {
        _map(this.permissions, (item) => {
            this.checkedPermissionsMap[item.name] = this.isPermissionChecked(item.name);
        });
    }

    isPermissionChecked(permissionName: string): boolean {
        return _includes(this.grantedPermissionNames, permissionName);
    }

    onPermissionChange(permission: FlatPermissionDto, $event) {
        this.checkedPermissionsMap[permission.name] = $event.target.checked;
    }

    getCheckedPermissions(): string[] {
        const permissions: string[] = [];
        _forEach(this.checkedPermissionsMap, function (value, key) {
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

        this._roleService.update(role).subscribe(
            () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            },
            () => {
                this.saving = false;
            }
        );
    }
}
