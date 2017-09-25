import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';

import { AbpModule, ABP_HTTP_PROVIDER } from '@abp/abp.module';

import { SharedModule } from '@shared/shared.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { RootRoutingModule } from './root-routing.module';

import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from '@shared/session/app-session.service';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

import { RootComponent } from './root.component';
import { AppPreBootstrap } from './AppPreBootstrap';
import { ModalModule } from 'ngx-bootstrap';


export function appInitializerFactory(injector: Injector) {
  return () => {

    abp.ui.setBusy();
    return new Promise<boolean>((resolve, reject) => {
      AppPreBootstrap.run(() => {
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
    RootRoutingModule
  ],
  declarations: [
    RootComponent
  ],
  providers: [
    ABP_HTTP_PROVIDER,
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
