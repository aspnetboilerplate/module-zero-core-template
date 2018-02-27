<template>
    <div>
        <Card>
            <p slot="title">{{'Tenants'|l}}</p>
            <Dropdown slot="extra"  @on-click="handleClickActionsDropdown">
                <a href="javascript:void(0)">
                    {{'Actions'|l}}
                    <Icon type="android-more-vertical"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name='Refresh'>{{'Refresh'|l}}</DropdownItem>
                    <DropdownItem name='Create'>{{'Create'|l}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Table :columns="columns" border :data="tenants"></Table>
            <Page :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
        </Card>
        <Modal v-model="showModal" :title="L('CreateNewTenant')" @on-ok="save" :okText="L('save')" :cancelText="L('cancel')">
            <div>
                <Form ref="newTenantForm" label-position="top" :rules="newtenantRule" :show-message="false" :model="editTenant">
                    <FormItem :label="L('TenancyName')" prop="tenancyName">
                        <Input v-model="editTenant.tenancyName" :maxlength="64" :minlength="2"></Input>
                    </FormItem>
                    <FormItem :label="L('Name')" prop="name">
                        <Input v-model="editTenant.name" :maxlength="128"></Input>
                    </FormItem>
                    <FormItem :label="L('DatabaseConnectionString')+'('+L('Optional')+')'">
                        <Input v-model="editTenant.connectionString" :maxlength="1024"></Input>
                    </FormItem>
                    <FormItem :label="L('AdminEmailAddress')" prop="adminEmailAddress">
                        <Input v-model="editTenant.adminEmailAddress" type="email" :maxlength="256"></Input>
                    </FormItem>
                    <FormItem>
                        <Checkbox v-model="editTenant.isActive">{{'IsActive'|l}}</Checkbox>
                    </FormItem>
                    <p><p>{{L("DefaultPasswordIs",'123qwe')}}</p></p>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="showModal=false">{{'Cancel'|l}}</Button>
                <Button @click="save" type="primary">{{'Save'|l}}</Button>
            </div>
        </Modal>
        <Modal v-model="showEditModal" :title="L('EditTenant')" @on-ok="save" :okText="L('save')" :cancelText="L('cancel')">
            <div>
                <Form ref="tenantForm" label-position="top" :rules="tenantRule" :show-message="false" :model="editTenant">
                    <FormItem :label="L('TenancyName')" prop="tenancyName">
                        <Input v-model="editTenant.tenancyName" :maxlength="64" :minlength="2"></Input>
                    </FormItem>
                    <FormItem :label="L('Name')" prop="name">
                        <Input v-model="editTenant.name" :maxlength="128"></Input>
                    </FormItem>
                    <FormItem>
                        <Checkbox v-model="editTenant.isActive">{{'IsActive'|l}}</Checkbox>
                    </FormItem>
                    <p><p>{{L("DefaultPasswordIs",'123qwe')}}</p></p>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="showEditModal=false">{{'Cancel'|l}}</Button>
                <Button @click="save" type="primary">{{'Save'|l}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    methods:{
        create(){
            this.editTenant={isActive:true};
            this.showModal=true;
        },
        async save(){
            if(!!this.editTenant.id){
                this.$refs.tenantForm.validate(async (val)=>{
                    if(val){
                        await this.$store.dispatch({
                            type:'tenant/update',
                            data:this.editTenant
                        })
                        this.showEditModal=false;
                        await this.getpage();
                    }
                })
                
            }else{
                this.$refs.newTenantForm.validate(async (val)=>{
                    if(val){
                        await this.$store.dispatch({
                            type:'tenant/create',
                            data:this.editTenant
                        })
                        this.showModal=false;
                        await this.getpage();
                    }
                })
            }
            
        },
        pageChange(page){
            this.$store.commit('tenant/setCurrentPage',page);
            this.getpage();
        },
        pagesizeChange(pagesize){
            this.$store.commit('tenant/setPageSize',pagesize);
            this.getpage();
        },
        async getpage(){
            await this.$store.dispatch({
                type:'tenant/getAll'
            })
        },
        handleClickActionsDropdown(name){
            if(name==='Create'){
                this.create();
            }else if(name==='Refresh'){
                this.getpage();
            }
        }
    },
    data(){
        return{
            editTenant:{},
            showModal:false,
            showEditModal:false,
            newtenantRule:{
                tenancyName:[{required: true}],
                name:[{required:true}],
                adminEmailAddress:[{required:true},{type: 'email'}]
            },
            tenantRule:{
                tenancyName:[{required: true}],
                name:[{required:true}],
            },
            columns:[{
                title:this.L('TenancyName'),
                key:'tenancyName'
            },{
                title:this.L('Name'),
                key:'name'
            },{
                title:this.L('IsActive'),
                render:(h,params)=>{
                    return h('Checkbox',{
                        props:{
                            value:this.tenants[params.index].isActive,
                            disabled:true
                        }
                    })
                }
            },{
                title: this.L('Actions'),
                key: 'action',
                width:150,
                render:(h,params)=>{
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
                                    this.editTenant=this.tenants[params.index];
                                    this.showEditModal=true;
                                }
                            }
                        },this.L('Edit')),
                        h('Button',{
                            props:{
                                type:'error',
                                size:'small'
                            },
                            on:{
                                click:async()=>{
                                    this.$Modal.confirm({
                                        title:this.L(''),
                                        content:this.L('Delete tenant'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'tenant/delete',
                                                data:this.tenants[params.index]
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
        }
    },
    computed:{
        tenants(){
            return this.$store.state.tenant.tenants;
        },
        totalCount(){
            return this.$store.state.tenant.totalCount;
        },
        currentPage(){
            return this.$store.state.tenant.currentPage;
        },
        pageSize(){
            return this.$store.state.tenant.pageSize;
        }
    },
    created(){
        this.getpage();
    }
}
</script>

