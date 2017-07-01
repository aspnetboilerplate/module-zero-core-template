import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { UserServiceProxy, RoleServiceProxy, CreateUserDto, UserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";

@Component({
  selector: 'edit-user-modal',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent extends AppComponentBase {

    @ViewChild('editUserModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;

    user: UserDto = null;
    roles: RoleDto[] = null;

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private _roleService: RoleServiceProxy
    ) {
        super(injector);
    }

	userInRole(role:RoleDto,user:UserDto): string {
		console.log("UserInRole user:" + user.fullName + " role:" + role.displayName);

		if(user.roles.indexOf(role.displayName)!= -1) {
			return "checked";
		}
		else {
			return "";
		}
	}

    show(id:number): void {
        this._roleService.getAll(0,1000)
            .subscribe((result) => {
                this.roles = result.items;
            });

		this._userService.get(id)
			.subscribe(
				(result) => {
					this.user = result;
					this.active = true;
        			this.modal.show();
				}
			);
    }

    onShown(): void {
        ($ as any).AdminBSB.input.activate($(this.modalContent.nativeElement));

        $('#frm_edit_user').validate({
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.form-group').append(error);
            }
        });
    }

    save(): void {
        var roles = [];
        $(this.modalContent.nativeElement).find("[name=role]").each(function(ind:number, elem:Element){
            if($(elem).is(":checked") == true){
                roles.push(elem.getAttribute("value").valueOf());
            }
        });

        this.user.roles = roles;
        this.saving = true;
        this._userService.update(this.user)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
