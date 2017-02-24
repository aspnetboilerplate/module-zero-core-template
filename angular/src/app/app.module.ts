import { NgModule, APP_INITIALIZER } from '@angular/core';
import * as ngCommon from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ng2-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { HeaderComponent } from './shared/layout/header.component';


import { AbpModule, ABP_HTTP_PROVIDER } from '@abp/abp.module';

import { AppCommonModule } from '@shared/common/app-common.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';

import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';

import { AppSessionService } from '@shared/common/session/app-session.service';

import { HomeComponent } from '@app/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        //HeaderComponent,

        HomeComponent
    ],
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,

        ModalModule.forRoot(),
        
        AbpModule,

        AppRoutingModule,

        AppCommonModule.forRoot(),
        ServiceProxyModule
    ],
    providers: [
        
    ]
})
export class AppModule { }