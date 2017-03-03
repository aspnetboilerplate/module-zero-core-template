import * as ngCommon from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';

import { AppSessionService } from './common/session/app-session.service';
import { AppUrlService } from './common/nav/app-url.service';
import { AppAuthService } from './common/auth/app-auth.service';
import { AppRouteGuard } from './common/auth/auth-route-guard';

import { TopBarComponent } from './layout/topbar.component';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        AbpModule,
        RouterModule
    ],
    declarations: [
        TopBarComponent
    ],
    exports: [
        TopBarComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppUrlService,
                AppAuthService,
                AppRouteGuard
            ]
        }
    }
}