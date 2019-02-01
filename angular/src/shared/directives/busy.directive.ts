import {
    AfterViewInit,
    Directive,
    ElementRef,
    Injectable,
    HostListener,
    Input,
    SimpleChanges,
    OnChanges
} from '@angular/core';

@Directive({
    selector: '[busy]'
})
@Injectable()
export class BusyDirective implements AfterViewInit, OnChanges {
    @Input('busy') loading: boolean;
    private $element: JQuery;

    constructor(private _element: ElementRef) { }

    ngAfterViewInit(): void {
        this.$element = $(this._element.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes['loading'].currentValue) {
            abp.ui.setBusy(this._element.nativeElement);
        } else {
            abp.ui.clearBusy(this._element.nativeElement);
        }
    }
}
