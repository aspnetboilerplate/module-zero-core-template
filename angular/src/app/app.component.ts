import { Component, ViewContainerRef, OnInit, AfterViewInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';

import { SignalRHelper } from '@shared/helpers/SignalRHelper';

@Component({
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

    private viewContainerRef: ViewContainerRef;
    
    ngOnInit(): void {
        SignalRHelper.initSignalR();

        abp.event.on('abp.notifications.received', userNotification => {
            abp.notifications.showUiNotifyForUserNotification(userNotification);
            
            //Desktop notification
            Push.create("AbpZeroTemplate", {
                body: userNotification.notification.data.message,
                icon: abp.appPath + 'assets/app-logo-small.png',
                timeout: 6000,
                onClick: function () {
                    window.focus();
                    this.close();
                }
            });
        });
    }

    ngAfterViewInit(): void {

    }
}