import { Component, OnInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { LocalizationService } from '@abp/localization/localization.service';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

import { AppAuthService } from '@shared/common/auth/app-auth.service';
import { AppConsts } from '@shared/AppConsts';

@Component({
    templateUrl: './topbar.component.html',
    selector: 'topbar',
    encapsulation: ViewEncapsulation.None
})
export class TopBarComponent extends AppComponentBase implements OnInit {

    languages: abp.localization.ILanguageInfo[];
    currentLanguage: abp.localization.ILanguageInfo;

    shownLoginNameTitle: string = "";
    shownLoginName: string = "";
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;


    constructor(
        injector: Injector,
        private sessionService: AbpSessionService,
        private abpMultiTenancyService: AbpMultiTenancyService,
        private userServiceProxy: UserServiceProxy,
        private _authService: AppAuthService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.languages = this.localization.languages;
        this.currentLanguage = this.localization.currentLanguage;

        this.getCurrentLoginInformations();
    }

    changeLanguage(languageName: string): void {
        //let input = new ChangeUserLanguageDto();
        //input.languageName = languageName;

        //this.userServiceProxy.changeLanguage(input).subscribe(() => {
        //    abp.utils.setCookieValue(
        //        "Abp.Localization.CultureName",
        //        languageName,
        //        new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
        //        abp.appPath
        //    );

        //    window.location.reload();
        //});
    }

    getCurrentLoginInformations(): void {
        //this.shownLoginName = this.appSession.getShownLoginName();
    }

    logout(): void {
        this._authService.logout();
    }
}