import { Component, ViewContainerRef, OnInit, AfterViewInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';

@Component({
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

    private viewContainerRef: ViewContainerRef;

    public constructor(
        viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef; // You need this small hack in order to catch application root view container ref (required by ng2 bootstrap modal)
    }

    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {

    }
}