import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { TenantServiceProxy, TenantDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { AppConsts } from '@shared/AppConsts';

import * as _ from "lodash";

@Component({
  selector: 'edit-tenant-modal',
  templateUrl: './edit-tenant.component.html'
})
export class EditTenantComponent extends AppComponentBase{

    @ViewChild('editTenantModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    tenant: TenantDto = null;

    constructor(
        injector: Injector,
        private _tenantService: TenantServiceProxy
    ) {
        super(injector);
    }

    show(id:number): void {
		this._tenantService.get(id)
			.finally(()=>{
				this.active = true;
				this.modal.show();
			})
			.subscribe((result)=>{
				this.tenant = result;
			});
    }

    onShown(): void {
        ($ as any).AdminBSB.input.activate($(this.modalContent.nativeElement));

        $('#frm_edit_tenant').validate({
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.form-group').append(error);
            }
        });
    }

    save(): void {
        this.saving = true;
        this._tenantService.update(this.tenant)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
