import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { BsDropdownDirective, BsDropdownToggleDirective, BsDropdownMenuDirective } from 'ngx-bootstrap/dropdown';
import { RouterLink } from '@angular/router';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    selector: 'header-user-menu',
    templateUrl: './header-user-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [BsDropdownDirective, BsDropdownToggleDirective, BsDropdownMenuDirective, RouterLink, LocalizePipe],
})
export class HeaderUserMenuComponent {
    constructor(private _authService: AppAuthService) {}

    logout(): void {
        this._authService.logout();
    }
}
