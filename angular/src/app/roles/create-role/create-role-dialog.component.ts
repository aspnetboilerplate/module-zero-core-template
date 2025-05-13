import { Component, Injector, OnInit, EventEmitter, output, ChangeDetectorRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
    RoleServiceProxy,
    RoleDto,
    PermissionDto,
    CreateRoleDto,
    PermissionDtoListResultDto,
} from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    templateUrl: 'create-role-dialog.component.html',
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
export class CreateRoleDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    role = new RoleDto();
    permissions: PermissionDto[] = [];
    checkedPermissionsMap: { [key: string]: boolean } = {};
    defaultPermissionCheckedStatus = true;

    onSave = output<EventEmitter<any>>();

    constructor(
        injector: Injector,
        private _roleService: RoleServiceProxy,
        public bsModalRef: BsModalRef,
        private cd: ChangeDetectorRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._roleService.getAllPermissions().subscribe((result: PermissionDtoListResultDto) => {
            this.permissions = result.items;
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
        // just return default permission checked status
        // it's better to use a setting
        return this.defaultPermissionCheckedStatus;
    }

    onPermissionChange(permission: PermissionDto, $event) {
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

        const role = new CreateRoleDto();
        role.init(this.role);
        role.grantedPermissions = this.getCheckedPermissions();

        this._roleService.create(role).subscribe(
            () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit(null);
            },
            () => {
                this.saving = false;
                this.cd.detectChanges();
            }
        );
    }
}
