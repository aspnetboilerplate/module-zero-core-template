import { Component, ChangeDetectionStrategy, Renderer2, OnInit } from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { SidebarLogoComponent } from './sidebar-logo.component';
import { SidebarUserPanelComponent } from './sidebar-user-panel.component';
import { SidebarMenuComponent } from './sidebar-menu.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SidebarLogoComponent, SidebarUserPanelComponent, SidebarMenuComponent],
})
export class SidebarComponent implements OnInit {
    sidebarExpanded: boolean;

    constructor(
        private renderer: Renderer2,
        private _layoutStore: LayoutStoreService
    ) {}

    ngOnInit(): void {
        this._layoutStore.sidebarExpanded.subscribe((value) => {
            this.sidebarExpanded = value;
            this.toggleSidebar();
        });
    }

    toggleSidebar(): void {
        if (this.sidebarExpanded) {
            this.hideSidebar();
        } else {
            this.showSidebar();
        }
    }

    showSidebar(): void {
        this.renderer.removeClass(document.body, 'sidebar-collapse');
        this.renderer.addClass(document.body, 'sidebar-open');
    }

    hideSidebar(): void {
        this.renderer.removeClass(document.body, 'sidebar-open');
        this.renderer.addClass(document.body, 'sidebar-collapse');
    }
}
