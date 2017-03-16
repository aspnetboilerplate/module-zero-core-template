import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies' 
import { TenantChangeModalComponent } from './tenant-change-modal.component'
import { AppComponentBase } from '@shared/app-component-base';
import { AppSessionService } from '@shared/session/app-session.service';

@Component({
    selector: 'tenant-change',
    template: 
    `<div *ngIf="isMultiTenancyEnabled" class='well'>
        {{l("CurrentTenant")}}: <span *ngIf="tenancyName" title="{{name}}"><strong>{{tenancyName}}</strong></span> <span *ngIf="!tenancyName">{{l("NotSelected")}}</span> (<a (click)="showChangeModal()">{{l("Change")}}</a>)
        <tenantChangeModal #tenantChangeModal></tenantChangeModal>
    </div>`
})
export class TenantChangeComponent extends AppComponentBase implements OnInit {
    
    @ViewChild('tenantChangeModal') tenantChangeModal: TenantChangeModalComponent;

    tenancyName: string;
    name: string;

    constructor(
        injector: Injector,
        private _appSessionService: AppSessionService,
        private _accountService: AccountServiceProxy
        ) { 
        super(injector);
    }

    ngOnInit() {
        if (this._appSessionService.tenant) {
            this.tenancyName = this._appSessionService.tenant.tenancyName;
            this.name = this._appSessionService.tenant.name;
        }
    }

    get isMultiTenancyEnabled(): boolean {        
        return abp.multiTenancy.isEnabled;
    }

    showChangeModal(): void{
        this.tenantChangeModal.show(this.tenancyName);
    }
}