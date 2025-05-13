import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'abp-pagination-controls',
    templateUrl: './abp-pagination-controls.component.html',
    standalone: true,
    imports: [NgxPaginationModule],
})
export class AbpPaginationControlsComponent {
    @Input() id: string;
    @Input() maxSize = 7;
    @Input() previousLabel = 'Previous';
    @Input() nextLabel = 'Next';
    @Input() screenReaderPaginationLabel = 'Pagination';
    @Input() screenReaderPageLabel = 'page';
    @Input() screenReaderCurrentLabel = "You're on page";
    @Output() pageChange = new EventEmitter<number>();

    private _directionLinks = true;
    private _autoHide = false;

    @Input()
    get directionLinks(): boolean {
        return this._directionLinks;
    }

    @Input()
    get autoHide(): boolean {
        return this._autoHide;
    }

    set directionLinks(value: boolean) {
        this._directionLinks = !!value && <any>value !== 'false';
    }

    set autoHide(value: boolean) {
        this._autoHide = !!value && <any>value !== 'false';
    }
}
