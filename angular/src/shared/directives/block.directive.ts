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
    selector: '[block]'
})
@Injectable()
export class BlockDirective implements AfterViewInit, OnChanges {
    @Input('block') loading: boolean;
    private $element: JQuery;

    constructor(private _element: ElementRef) { }

    ngAfterViewInit(): void {
        this.$element = $(this._element.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges): void {
        $.blockUI.defaults.overlayCSS.cursor = 'not-allowed';
        if (changes['loading'].currentValue) {
            abp.ui.block(this._element.nativeElement);
        } else {
            abp.ui.unblock(this._element.nativeElement);
        }
    }
}
