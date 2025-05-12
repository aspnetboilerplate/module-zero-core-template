import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
    enableProdMode,
    provideExperimentalZonelessChangeDetection,
    APP_INITIALIZER,
    LOCALE_ID,
    importProvidersFrom,
} from '@angular/core';
import { environment } from './environments/environment';
import { getCurrentLanguage } from './root.module';

import 'moment/min/locales.min';
import 'moment-timezone';
import { provideClientHydration, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';
import { AppInitializer } from './app-initializer';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

if (environment.production) {
    enableProdMode();
}

const bootstrap = () => {
    return bootstrapApplication(RootComponent, {
        providers: [
            importProvidersFrom(
                BrowserModule,
                SharedModule.forRoot(),
                ModalModule.forRoot(),
                BsDropdownModule.forRoot(),
                CollapseModule.forRoot(),
                TabsModule.forRoot(),
                ServiceProxyModule,
                RootRoutingModule
            ),
            provideExperimentalZonelessChangeDetection(),
            provideClientHydration(),
            { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
            {
                provide: APP_INITIALIZER,
                useFactory: (appInitializer: AppInitializer) => appInitializer.init(),
                deps: [AppInitializer],
                multi: true,
            },
            {
                provide: API_BASE_URL,
                useFactory: () => AppConsts.remoteServiceBaseUrl,
            },
            {
                provide: LOCALE_ID,
                useFactory: getCurrentLanguage,
            },
            provideAnimations(),
            provideHttpClient(withInterceptorsFromDi()),
            providePrimeNG({
                theme: {
                    preset: Lara,
                },
            }),
        ],
    });
};

/* "Hot Module Replacement" is enabled as described on
 * https://medium.com/@beeman/tutorial-enable-hrm-in-angular-cli-apps-1b0d13b80130#.sa87zkloh
 */

bootstrap(); // Regular bootstrap
