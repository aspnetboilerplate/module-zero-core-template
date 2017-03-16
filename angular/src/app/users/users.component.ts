import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserListDto } from '@shared/service-proxies/service-proxies';

import { CreateUserModalComponent } from './create-user-modal.component';

@Component({
    templateUrl: './users.component.html',
    animations: [appModuleAnimation()]
})
export class UsersComponent extends AppComponentBase implements OnInit {

    @ViewChild('createUserModal') createUserModal: CreateUserModalComponent;
    users: UserListDto[] = [];

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this._userService.getUsers()
            .subscribe((result) => {
                this.users = result.items;
            });
    }

    createUser(): void {
        this.createUserModal.show();
    }
}