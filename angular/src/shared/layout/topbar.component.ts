import { Component, OnInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { LocalizationService } from '@abp/localization/localization.service';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppAuthService } from '@shared/common/auth/app-auth.service';
import { AppConsts } from '@shared/AppConsts';

import { MenuItem } from '@shared/layout/menu-item';

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
        private _sessionService: AbpSessionService,
        private abpMultiTenancyService: AbpMultiTenancyService,
        private userServiceProxy: UserServiceProxy,
        private _authService: AppAuthService
    ) {
        super(injector);
    }

    menuItems: MenuItem[] = [
        new MenuItem("Home", "", "fa fa-home", "/app/home", true),
        new MenuItem("Tenants", "Pages.Tenants", "fa fa-globe", "/app/tenants", true),
        new MenuItem("Users", "Pages.Users", "fa fa-users", "/app/users", true),
        new MenuItem("About", "", "fa fa-info", "/app/about", false)
    ];

    ngOnInit() {
        this.languages = this.localization.languages;
        this.currentLanguage = this.localization.currentLanguage;

        this.getCurrentLoginInformations();
    }

    showMenuItem(menuItem): boolean {
        
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        if (!menuItem.requiresAuthentication) {
            return true;
        }

        return this._sessionService.userId > 0;
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