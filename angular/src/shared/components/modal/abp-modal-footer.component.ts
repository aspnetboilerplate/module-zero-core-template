import {
  Component,
  input,
  output,
  EventEmitter,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'abp-modal-footer',
  templateUrl: './abp-modal-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbpModalFooterComponent extends AppComponentBase {
  cancelLabel = input(this.l('Cancel'));
  cancelDisabled= input<boolean>();
  saveLabel = input(this.l('Save'));
  saveDisabled = input<boolean>();

  onCancelClick = output<EventEmitter<number>>();

  constructor(injector: Injector) {
    super(injector);
  }
}
