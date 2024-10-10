import { AppComponentBase } from 'shared/app-component-base';
import { Component, Injector, ChangeDetectorRef } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

export class EntityDto {
    id: number;
}

@Component({
    template: ''
})
export abstract class PagedListingComponentBase<TEntityDto> extends AppComponentBase {
    public pageSize = 10;
    public pageNumber = 1;
    public totalPages = 1;
    public totalItems: number;
    public isTableLoading = false;
    protected cd: ChangeDetectorRef;

    constructor(
        injector: Injector,
        cd: ChangeDetectorRef
    ) {
        super(injector);
        this.cd = cd;
    }

    refresh(event?: LazyLoadEvent): void {
        this.list(event);
    }

    protected abstract list(event?: LazyLoadEvent): void;
    protected abstract delete(entity: TEntityDto): void;
}
