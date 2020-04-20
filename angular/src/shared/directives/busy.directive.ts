import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[busy]',
})
export class BusyDirective {
  @Input() set busy(isBusy: boolean) {
    this.refreshState(isBusy);
  }

  constructor(private _element: ElementRef) {}

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
