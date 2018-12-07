<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('UserName')+':'" style="width:100%">
                                <Input v-model="filterUserName"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('Name')+':'" style="width:100%">
                                <Input v-model="filterName"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('IsActive')+':'" style="width:100%">
                                <Select :value="'All'" :placeholder="L('Select')" @on-change="isActiveChange">
                                    <Option value="All">{{L('All')}}</Option>
                                    <Option value="Actived">{{L('Actived')}}</Option>
                                    <Option value="NoActive">{{L('NoActive')}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('CreationTime')+':'" style="width:100%">
                                <DatePicker  v-model="filterCreationTime" type="datetimerange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
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
        <create-user v-model="createModalShow" @save-success="getpage"></create-user>
        <edit-user v-model="editModalShow" @save-success="getpage"></edit-user>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import {FieldType,Filter,CompareType} from '../../../store/entities/filter'
    import PageRequest from '../../../store/entities/page-request'
    import CreateUser from './create-user.vue'
    import EditUser from './edit-user.vue'

    class PageUserRequest extends PageRequest{
        userName:string='';
        name:string='';
        isActive:boolean=null;
        from:Date=null;
        to:Date=null;
    }
    //should update IUserAppService in AbpCompanyName.AbpProjectName.Application
    //create PagedUserResultRequestDto derived from PagedResultRequestDto, to replace PagedResultRequestDto in declaration of IUserAppService

    @Component({
        components:{CreateUser,EditUser}
    })
    export default class Users extends AbpBase{
        edit(){
            this.editModalShow=true;
        }

        filterUserName:string='';
        filterName:string='';
        filterCreationTime:Date[]=[];
        filterIsActive:boolean=null;

        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.user.list;
        };
        get loading(){
            return this.$store.state.user.loading;
        }
        create(){
            this.createModalShow=true;
        }
        isActiveChange(val:string){
            if(val==='Actived'){
                this.filterIsActive=true;
            }else if(val==='NoActive'){
                this.filterIsActive=false;
            }else{
                this.filterIsActive=null;
            }
        }
        pageChange(page:number){
            this.$store.commit('user/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('user/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            //let where= Util.buildFilters(this.filters);//sql injection
            let pagerequest=new PageUserRequest();
            pagerequest.maxResultCount=this.pageSize;
            pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            
            pagerequest.userName=this.filterUserName;
            pagerequest.name=this.filterName;
            pagerequest.isActive=this.filterIsActive;
            
            if (this.filterCreationTime.length>0) {
                pagerequest.from=this.filterCreationTime[0];
            } 

            if (this.filterCreationTime.length>1) {
                pagerequest.to=this.filterCreationTime[1];
            }

            await this.$store.dispatch({
                type:'user/getAll',
                data:pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.user.pageSize;
        }
        get totalCount(){
            return this.$store.state.user.totalCount;
        }
        get currentPage(){
            return this.$store.state.user.currentPage;
        }
        columns=[{
            title:this.L('UserName'),
            key:'userName'
        },{
            title:this.L('Name'),
            key:'name'
        },{
            title:this.L('IsActive'),
            render:(h:any,params:any)=>{
               return h('span',params.row.isActive?this.L('Yes'):this.L('No'))
            }
        },{
            title:this.L('CreationTime'),
            key:'creationTime',
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.creationTime).toLocaleDateString())
            }
        },{
            title:this.L('LastLoginTime'),
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.lastLoginTime).toLocaleString())
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
                                this.$store.commit('user/edit',params.row);
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
                                        content:this.L('DeleteUserConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'user/delete',
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
            await this.$store.dispatch({
                type:'user/getRoles'
            })
        }
    }
</script>