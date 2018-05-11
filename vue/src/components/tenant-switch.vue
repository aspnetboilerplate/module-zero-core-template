<template>
    <div>
        <Modal
         :title="L('ChangeTenant')"
         :value="value"
         @on-ok="changeTenant"
         @on-visible-change="visibleChange"
        >
             <Input :placeholder="L('TenancyName')" v-model="changedTenancyName"></Input>
             <div v-if="!changedTenancyName" style="margin-top:10px">{{L('LeaveEmptyToSwitchToHost')}}</div>
             <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="changeTenant" type="primary">{{L('OK')}}</Button>
             </div>
        </Modal>
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../lib/util'
import AbpBase from '../lib/abpbase'
@Component
export default class TenantSwitch extends AbpBase{
    @Prop({default:false}) value:boolean
    changedTenancyName:string='';
    get tenant(){
        return this.$store.state.session.tenant;
    }
    cancel(){
        this.$emit('input',false);
    }
    visibleChange(value:boolean){
        if(!value){
            this.$emit('input',value);
        }else{
            this.changedTenancyName=this.$store.state.session.tenant?this.$store.state.session.tenant.name:''
        }
    }
    async changeTenant(){
        if (!this.changedTenancyName) {
            Util.abp.multiTenancy.setTenantIdCookie(undefined);;
            location.reload();
            return;
        }else{
                let tenant=await this.$store.dispatch({
                    type:'account/isTenantAvailable',
                    data:{tenancyName:this.changedTenancyName}
                })
                switch(tenant.state){
                    case 1:
                        Util.abp.multiTenancy.setTenantIdCookie(tenant.tenantId);
                        location.reload();
                        return;
                    case 2:
                        this.$Modal.error({title:this.L('Error'),content:this.L('TenantIsNotActive')});
                        break;
                    case 3:
                        this.$Modal.error({title:this.L('Error'),content:this.L('ThereIsNoTenantDefinedWithName{0}',undefined,this.changedTenancyName)});
                        break;
                }
            }
    }
}
</script>

