import { Component, ViewContainerRef, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login/login.service';
import { AppConsts } from '@shared/AppConsts';

import * as moment from 'moment';

@Component({
    templateUrl: './account.component.html',
    styleUrls: [
        './account.component.less'
    ],
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

    private viewContainerRef: ViewContainerRef;

    currentYear: number = moment().year();

    public constructor(
        private _loginService: LoginService,
        viewContainerRef: ViewContainerRef
    ) {
        this.viewContainerRef = viewContainerRef; // We need this small hack in order to catch application root view container ref for modals
    }

    showTenantChange(): boolean {
        return abp.multiTenancy.isEnabled;
    }

    ngOnInit(): void {
        this._loginService.init();
        $('body').attr('class', 'page-md login');
    }
}