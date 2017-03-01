import { NgModule } from '@angular/core';
import * as ngCommon from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ng2-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule, ABP_HTTP_PROVIDER } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/common/shared.module';

import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';

import { AppSessionService } from '@shared/common/session/app-session.service';

import { HomeComponent } from '@app/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
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
        ServiceProxyModule,
        SharedModule
    ],
    providers: [
        
    ]
})
export class AppModule { }