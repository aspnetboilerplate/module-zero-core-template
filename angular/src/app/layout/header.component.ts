import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderLeftNavbarComponent } from './header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './header-language-menu.component';
import { HeaderUserMenuComponent } from './header-user-menu.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [HeaderLeftNavbarComponent, HeaderLanguageMenuComponent, HeaderUserMenuComponent],
})
export class HeaderComponent {}
