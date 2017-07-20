﻿import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l("HomePage"), "", "home", "/app/home"),

        new MenuItem(this.l("Tenants"), "Pages.Tenants", "business", "/app/tenants"),
        new MenuItem(this.l("Users"), "Pages.Users", "people", "/app/users"),
        new MenuItem(this.l("Roles"), "Pages.Roles", "local_offer", "/app/roles"),
        new MenuItem(this.l("About"), "", "info", "/app/about"),

        new MenuItem(this.l("MultiLevelMenu"), "", "menu", "", [
            new MenuItem(this.l("ASPNETBoilerplate"), "", "", "", [
                new MenuItem(this.l("Home"), "", "", "https://aspnetboilerplate.com?ref=abptmpl"),
                new MenuItem(this.l("Templates"), "", "", "https://aspnetboilerplate.com/Templates?ref=abptmpl"),
                new MenuItem(this.l("Samples"), "", "", "https://aspnetboilerplate.com/Samples?ref=abptmpl"),
                new MenuItem(this.l("Documents"), "", "", "https://aspnetboilerplate.com/Pages/Documents?ref=abptmpl")
            ]),
            new MenuItem(this.l("ASPNETZero"), "", "", "", [
                new MenuItem(this.l("Home"), "", "", "https://aspnetzero.com?ref=abptmpl"),
                new MenuItem(this.l("Description"), "", "", "https://aspnetzero.com/?ref=abptmpl#description"),
                new MenuItem(this.l("Features"), "", "", "https://aspnetzero.com/?ref=abptmpl#features"),
                new MenuItem(this.l("Pricing"), "", "", "https://aspnetzero.com/?ref=abptmpl#pricing"),
                new MenuItem(this.l("Faq"), "", "", "https://aspnetzero.com/Faq?ref=abptmpl"),
                new MenuItem(this.l("Documents"), "", "", "https://aspnetzero.com/Documents?ref=abptmpl")
            ])
        ])
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

        return true;
    }
}