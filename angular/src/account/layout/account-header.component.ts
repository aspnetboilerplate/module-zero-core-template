import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'account-header',
    templateUrl: './account-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class AccountHeaderComponent {}
