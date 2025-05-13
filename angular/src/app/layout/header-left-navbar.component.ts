import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { RouterLink } from '@angular/router';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    selector: 'header-left-navbar',
    templateUrl: './header-left-navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, LocalizePipe],
})
export class HeaderLeftNavbarComponent implements OnInit {
    sidebarExpanded: boolean;

    constructor(private _layoutStore: LayoutStoreService) {}

    ngOnInit(): void {
        this._layoutStore.sidebarExpanded.subscribe((value) => {
            this.sidebarExpanded = value;
        });
    }

    toggleSidebar(): void {
        this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
    }
}
