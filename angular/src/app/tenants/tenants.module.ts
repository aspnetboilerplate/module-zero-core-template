import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TenantsRoutingModule } from './tenants-routing.module';
import { CreateTenantDialogComponent } from './create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './edit-tenant/edit-tenant-dialog.component';
import { TenantsComponent } from './tenants.component';

@NgModule({
    declarations: [
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        TenantsComponent,
    ],
    imports: [SharedModule, TenantsRoutingModule],
})
export class TenantsModule {}
