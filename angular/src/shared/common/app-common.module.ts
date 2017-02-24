import * as ngCommon from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';

import { AbpModule } from '@abp/abp.module';
import { CommonModule } from '@shared/common/common.module';

import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        AbpModule,
        CommonModule
    ],
    declarations: [
        
    ],
    exports: [
        
    ]
})
export class AppCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppCommonModule,
            providers: [
                AppAuthService,
                AppRouteGuard
            ]
        }
    }
}