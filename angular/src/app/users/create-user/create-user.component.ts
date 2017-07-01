import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { UserServiceProxy, RoleServiceProxy, CreateUserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";

@Component({
  selector: 'create-user-modal',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent extends AppComponentBase implements OnInit {

    @ViewChild('createUserModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    user: CreateUserDto = null;
    roles: RoleDto[] = null;

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private _roleService: RoleServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        //max of 1000 roles, todo: change to -1 for all
        this._roleService.getAll(0,1000)
        .subscribe((result) => {
            this.roles = result.items;
        });
    }

    show(): void {
        this.active = true;
        this.modal.show();
        this.user = new CreateUserDto({ isActive: true });
    }

    onShown(): void {
        ($ as any).AdminBSB.input.activate($(this.modalContent.nativeElement));

        $('#frm_create_user').validate({
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
        this._userService.create(this.user)
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
