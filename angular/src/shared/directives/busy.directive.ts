import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[busy]',
    standalone: true,
})
export class BusyDirective {
    constructor(private _element: ElementRef) {}

    @Input() set busy(isBusy: boolean) {
        this.refreshState(isBusy);
    }

    refreshState(isBusy: boolean): void {
        if (isBusy === undefined) {
            return;
        }

        if (isBusy) {
            abp.ui.setBusy(this._element.nativeElement);
        } else {
            abp.ui.clearBusy(this._element.nativeElement);
        }
    }
}
