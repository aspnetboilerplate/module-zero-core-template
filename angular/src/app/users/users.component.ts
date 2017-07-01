import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { UserServiceProxy, UserDto } from '@shared/service-proxies/service-proxies';
import { PaginatePipe, PaginationService } from 'ngx-pagination';

import { PagedListingComponentBase, PagedRequestDto, EntityDto } from "shared/paged-listing-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";

@Component({
    templateUrl: './users.component.html',
    animations: [appModuleAnimation()]
})
export class UsersComponent extends PagedListingComponentBase<UserDto> {

    @ViewChild('createUserModal') createUserModal: CreateUserComponent;
	@ViewChild('editUserModal') editUserModal: EditUserComponent;

    active: boolean = false;
    users: UserDto[] = [];

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }

    protected getUIPanelSelector(): string {
        return "div.main-content>>table";
    }

    changePassword(user:UserDto) {
        abp.message.info("Change Password", "Change Password");
    }

	toggleActive(user:UserDto) {
        let newStatus = (!user.isActive?'active':'in active');
		abp.message.confirm(
			"Change user '" + user.fullName + "' to " + newStatus,
			(result:boolean) => {
				if(result) {
					this._userService.get(user.id)
						.finally(()=>{})
						.subscribe((result)=>{
							result.isActive = !result.isActive
							
							// update
							this._userService.update(result)
									.finally(()=>{
										this.refresh();
                                        abp.message.success("User is now '" + newStatus + "'", "User status updated" );
									})
									.subscribe((result)=>{});
						});
				}
			}
		);
	}

    protected list(request:PagedRequestDto, pageNumber:number, finishedCallback: Function): void
    {
        this._userService.getAll(request.skipCount, request.maxResultCount)
            .finally(()=>{
                finishedCallback();
            })
            .subscribe((result)=>{
				this.users = result.items;
				this.showPaging(result, pageNumber);
            });
    }

    protected delete(user: UserDto): void {
		abp.message.confirm(
			"Delete user '"+ user.fullName +"'?",
			(result:boolean) => {
				if(result) {
					this._userService.delete(user.id)
						.finally(() => {
							abp.message.success("Deleted User: " + user.fullName );
							this.refresh();
						})
						.subscribe(() => {
						});
				}
			}
		);
    }

    // Show Modals
    createUser(): void {
        this.createUserModal.show();
    }

    editUser(user:UserDto): void {
        this.editUserModal.show(user.id);
    }
}