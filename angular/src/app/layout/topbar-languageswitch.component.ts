import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  templateUrl: './topbar-languageswitch.component.html',
  selector: 'topbar-languageswitch',
  encapsulation: ViewEncapsulation.None
})
export class TopBarLanguageSwitchComponent extends AppComponentBase implements OnInit {

  languages: abp.localization.ILanguageInfo[];
  currentLanguage: abp.localization.ILanguageInfo;
  
  constructor(
    injector: Injector,
    private _sessionService: AbpSessionService,
    private _authService: AppAuthService,
    private _router: Router
  ) {
    super(injector);
  }

  ngOnInit() {
    this.languages = this.localization.languages;
    this.currentLanguage = this.localization.currentLanguage;
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
}