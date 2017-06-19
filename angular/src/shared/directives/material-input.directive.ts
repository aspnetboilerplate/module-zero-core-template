import { Directive, ElementRef, Injectable } from '@angular/core';

@Directive({
  selector: '[materialInput]'
})

@Injectable()
export class MaterialInput {

  constructor(el: ElementRef) {
    ($ as any).AdminBSB.input.activate($(el.nativeElement).parent());
  }

}
