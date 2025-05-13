import { Component, OnInit, ViewEncapsulation, Injector, Renderer2 } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AccountHeaderComponent } from './layout/account-header.component';
import { TenantChangeComponent } from './tenant/tenant-change.component';
import { RouterOutlet } from '@angular/router';
import { AccountLanguagesComponent } from './layout/account-languages.component';
import { AccountFooterComponent } from './layout/account-footer.component';

@Component({
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        AccountHeaderComponent,
        TenantChangeComponent,
        RouterOutlet,
        AccountLanguagesComponent,
        AccountFooterComponent,
    ],
})
export class AccountComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        private renderer: Renderer2
    ) {
        super(injector);
    }

    showTenantChange(): boolean {
        return abp.multiTenancy.isEnabled;
    }

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'login-page');
    }
}
