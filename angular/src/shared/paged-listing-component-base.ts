
import { AppComponentBase } from "shared/app-component-base";
import { Injector, Component, ViewEncapsulation, OnInit } from '@angular/core';

export class PagedResultDto{
    items:any[];
    totalCount:number;
}

export class EntityDto{
    id: number;
}

export class PagedRequestDto{
    skipCount: number;
    maxResultCount: number;
}

export abstract class PagedListingComponentBase<EntityDto> extends AppComponentBase implements OnInit {

    public pageSize: number = 10;
    public pageNumber: number = 1;
    public totalPages: number = 1;
    public totalItems: number;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh(): void {
        this.getDataPage(this.pageNumber);
    }   

    public showPaging(result: PagedResultDto, pageNumber: number ): void {
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize) ) / this.pageSize) + 1;

        this.totalItems = result.totalCount;
        this.pageNumber = pageNumber;
    }

    public getDataPage(page:number): void {
        var req = new PagedRequestDto();
        req.maxResultCount = this.pageSize;
        req.skipCount = (page-1) * this.pageSize;

        var blockElem = $(this.getUIPanelSelector());
        abp.ui.setBusy(blockElem);
        this.list(req, page, ()=>{
            abp.ui.clearBusy(blockElem);
        });
    }

    protected abstract getUIPanelSelector(): string;
    protected abstract list(request:PagedRequestDto, pageNumber:number, finishedCallback: Function): void;
    protected abstract delete(entity: EntityDto): void;
}