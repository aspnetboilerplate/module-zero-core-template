<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="100" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="8">
                            <FormItem :label="L('TenancyName')+':'" style="width:100%">
                                <Input v-model="filters[1].Value"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem :label="L('TenantName')+':'" style="width:100%">
                                <Input v-model="filters[0].Value"></Input>
                            </FormItem>
                        </Col>                        
                        <Col span="8">
                            <FormItem :label="L('IsActive')+':'" style="width:100%">
                                <Select :value="'All'" :placeholder="L('Select')" @on-change="isActiveChange">
                                    <Option value="All">{{L('All')}}</Option>
                                    <Option value="Actived">{{L('Actived')}}</Option>
                                    <Option value="NoActive">{{L('NoActive')}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-tenant v-model="createModalShow" @save-success="getpage"></create-tenant>
        <edit-tenant v-model="editModalShow" @save-success="getpage"></edit-tenant>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import {FieldType,Filter,CompareType} from '../../../store/entities/filter'
    import PageRequest from '../../../store/entities/page-request'
    import CreateTenant from './create-tenant.vue'
    import EditTenant from './edit-tenant.vue'
    @Component({
        components:{CreateTenant,EditTenant}
    })
    export default class Tenants extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
        filters:Filter[]=[
            {Type:FieldType.String,Value:'',FieldName:'Name',CompareType:CompareType.Contains},
            {Type:FieldType.String,Value:'',FieldName:'TenancyName',CompareType:CompareType.Contains},
            {Type:FieldType.Boolean,Value:null,FieldName:'IsActive',CompareType:CompareType.Equal}
        ]
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.tenant.list;
        };
        get loading(){
            return this.$store.state.tenant.loading;
        }
        create(){
            this.createModalShow=true;
        }
        isActiveChange(val:string){
            if(val==='Actived'){
                this.filters[2].Value=true;
            }else if(val==='NoActive'){
                this.filters[2].Value=false;
            }else{
                this.filters[2].Value=null;
            }
        }
        pageChange(page:number){
            this.$store.commit('tenant/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('tenant/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            let where= Util.buildFilters(this.filters);
            let pagerequest=new PageRequest();
            pagerequest.maxResultCount=this.pageSize;
            pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            pagerequest.where=where;
            await this.$store.dispatch({
                type:'tenant/getAll',
                data:pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.tenant.pageSize;
        }
        get totalCount(){
            return this.$store.state.tenant.totalCount;
        }
        get currentPage(){
            return this.$store.state.tenant.currentPage;
        }
        columns=[{
            title:this.L('TenancyName'),
            key:'tenancyName'
        },{
            title:this.L('TenantName'),
            key:'name'
        },{
            title:this.L('IsActive'),
            render:(h:any,params:any)=>{
                return h('span',params.row.isActive?this.L('Yes'):this.L('No'))
            }
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small'
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on:{
                            click:()=>{
                                this.$store.commit('tenant/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('Edit')),
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small'
                        },
                        on:{
                            click:async ()=>{
                                this.$Modal.confirm({
                                        title:this.L('Tips'),
                                        content:this.L('DeleteTenantConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'tenant/delete',
                                                data:params.row
                                            })
                                            await this.getpage();
                                        }
                                })
                            }
                        }
                    },this.L('Delete'))
                ])
            }
        }]
        async created(){
            this.getpage();
        }
    }
</script>