import { Component, OnInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from '@abp/localization/localization.service';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { AppComponentBase } from '../app-component-base';
import { AppAuthService } from '../auth/app-auth.service';
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
        private _authService: AppAuthService,
        private _router: Router
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
        this.getCurrentLoginInformations();
        this.languages = this.localization.languages;
        this.currentLanguage = this.localization.currentLanguage;
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
        abp.utils.setCookieValue(
            "Abp.Localization.CultureName",
            languageName,
            new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
            abp.appPath
        );

        location.reload();
    }

    getCurrentLoginInformations(): void {
        if (this.appSession.userId > 0) {
            this.shownLoginName = this.appSession.getShownLoginName();
        }
    }

    userIsLoggedIn(): boolean {
        return this.appSession.userId > 0;
    }

    logout(): void {
        this._authService.logout();
    }
}