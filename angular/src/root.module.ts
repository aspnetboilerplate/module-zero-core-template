import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';

import { AbpModule } from '@abp/abp.module';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@shared/shared.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { RootRoutingModule } from './root-routing.module';

import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from '@shared/session/app-session.service';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

import { RootComponent } from './root.component';
import { AppPreBootstrap } from './AppPreBootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule, HttpResponse } from '@angular/common/http';

export function appInitializerFactory(injector: Injector) {
  return () => {

    abp.ui.setBusy();
    return new Promise<boolean>((resolve, reject) => {
      AppPreBootstrap.run(() => {
        abp.event.trigger('abp.dynamicScriptsInitialized');
        var appSessionService: AppSessionService = injector.get(AppSessionService);
        appSessionService.init().then(
          (result) => {
            abp.ui.clearBusy();
            resolve(result);
          },
          (err) => {
            abp.ui.clearBusy();
            reject(err);
          }
        );
      });
    });
  }
}

export function getRemoteServiceBaseUrl(): string {
  return AppConsts.remoteServiceBaseUrl;
}

export function getCurrentLanguage(): string {
    return abp.localization.currentLanguage.name;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    ModalModule.forRoot(),
    AbpModule,
    ServiceProxyModule,
    RootRoutingModule,
    HttpClientModule
  ],
  declarations: [
    RootComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector],
      multi: true
    },
      {
          provide: LOCALE_ID,
          useFactory: getCurrentLanguage
      }
  ],
  bootstrap: [RootComponent]
})
export class RootModule {

}
