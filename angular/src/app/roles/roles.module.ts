import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { CreateRoleDialogComponent } from './create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './edit-role/edit-role-dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [RolesComponent, CreateRoleDialogComponent, EditRoleDialogComponent],
    imports: [SharedModule, RolesRoutingModule, CommonModule],
})
export class RolesModule {}
