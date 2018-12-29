<template>
    <div>
        <Modal
         :title="L('CreateNewTenant')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="tenantForm"  label-position="top" :rules="tenantRule" :model="tenant">
                <FormItem :label="L('TenancyName')" prop="tenancyName">
                    <Input v-model="tenant.tenancyName" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('Name')" prop="name">
                    <Input v-model="tenant.name" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('DatabaseConnectionString')" prop="databaseConnectionString">
                    <Input v-model="tenant.databaseConnectionString" :maxlength="1024"></Input>
                </FormItem>
                <FormItem :label="L('AdminEmailAddress')" prop="adminEmailAddress">
                    <Input v-model="tenant.adminEmailAddress" type="email" :maxlength="256"></Input>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="tenant.isActive">{{L('IsActive')}}</Checkbox>
                </FormItem>
                <p><p>{{L("DefaultPasswordIs",undefined,'123qwe')}}</p></p>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import Tenant from '@/store/entities/tenant';
    @Component
    export default class CreateTenant extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        tenant:Tenant=new Tenant();
        save(){
            (this.$refs.tenantForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'tenant/create',
                        data:this.tenant
                    });
                    (this.$refs.tenantForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.tenantForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
        }
        tenantRule={
            name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('TenantName')),trigger: 'blur'}],
            tenancyName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TenancyName')),trigger: 'blur'}],
            adminEmailAddress:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('AdminEmailAddress')),trigger: 'blur'},{type: 'email'}]
        }
    }
</script>

