import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem("HomePage", "", "home", "/app/home", true),
        new MenuItem("Tenants", "Pages.Tenants", "business", "/app/tenants", true),
        new MenuItem("Users", "Pages.Users", "people", "/app/users", true),
        new MenuItem("About", "", "info", "/app/about", true)
    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {

        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        if (!menuItem.requiresAuthentication) {
            return true;
        }

        return this.appSession.userId > 0;
    }
}