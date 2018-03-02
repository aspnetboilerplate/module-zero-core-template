<template>
    <div>
        <Card>
            <p slot="title">{{'Roles'|l}}</p>
            <Dropdown slot="extra"  @on-click="handleClickActionsDropdown">
                <a href="javascript:void(0)">
                    {{'Actions'|l}}
                    <Icon type="android-more-vertical"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name='Refresh'>{{'Refresh' | l}}</DropdownItem>
                    <DropdownItem name='Create'>{{'Create' | l}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Table :columns="columns" border :data="roles"></Table>
            <Page :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
        </Card>
        <Modal v-model="showModal" :title="L('CreateNewRole')" @on-ok="save" :okText="L('save')" :cancelText="L('cancel')">
            <div>
                <Form ref="newRoleForm" label-position="top" :rules="newRoleRule" :model="editRole">
                    <FormItem :label="L('RoleName')" prop="name">
                        <Input v-model="editRole.name" :maxlength="32" :minlength="2"></Input>
                    </FormItem>
                    <FormItem :label="L('DisplayName')" prop="displayName">
                        <Input v-model="editRole.displayName" :maxlength="32" :minlength="2"></Input>
                    </FormItem>
                    <FormItem :label="L('RoleDescription')" prop="description">
                        <Input v-model="editRole.description"></Input>
                    </FormItem>
                    <FormItem :label="L('Permissions')">
                        <CheckboxGroup v-model="editRole.permissions">
                            <Checkbox :label="permission.name" v-for="permission in permissions" :key="permission.name"><span>{{permission.displayName}}</span></Checkbox>
                        </CheckboxGroup>
                    </FormItem>                    
                </Form>
            </div>
            <div slot="footer">
                <Button @click="showModal=false">{{'Cancel'|l}}</Button>
                <Button @click="save" type="primary">{{'Save'|l}}</Button>
            </div>
        </Modal>
        <Modal v-model="showEditModal" :title="L('EditRole')" @on-ok="save" :okText="L('save')" :cancelText="L('cancel')">
            <div>
                <Form ref="roleForm" label-position="top" :rules="roleRule" :model="editRole">
                    <FormItem :label="L('RoleName')" prop="name">
                        <Input v-model="editRole.name" :maxlength="32" :minlength="2"></Input>
                    </FormItem>
                    <FormItem :label="L('DisplayName')" prop="displayName">
                        <Input v-model="editRole.displayName" :maxlength="32" :minlength="2"></Input>
                    </FormItem>
                    <FormItem :label="L('RoleDescription')" prop="description">
                        <Input v-model="editRole.description"></Input>
                    </FormItem>
                    <FormItem :label="L('Permissions')">
                        <CheckboxGroup v-model="editRole.permissions">
                            <Checkbox :label="permission.name" v-for="permission in permissions" :key="permission.name"><span>{{permission.displayName}}</span></Checkbox>
                        </CheckboxGroup>
                    </FormItem>                    
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
            this.editRole={isActive:true};
            this.showModal=true;
        },
        async save(){
            if(!!this.editRole.id){
                this.$refs.roleForm.validate(async (val)=>{
                    if(val){
                        await this.$store.dispatch({
                            type:'role/update',
                            data:this.editRole
                        })
                        this.showEditModal=false;
                        await this.getpage();
                    }
                })
                
            }else{
                this.$refs.newRoleForm.validate(async (val)=>{
                    if(val){
                        await this.$store.dispatch({
                            type:'role/create',
                            data:this.editRole
                        })
                        this.showModal=false;
                        await this.getpage();
                    }
                })
            }
            
        },
        pageChange(page){
            this.$store.commit('role/setCurrentPage',page);
            this.getpage();
        },
        pagesizeChange(pagesize){
            this.$store.commit('role/setPageSize',pagesize);
            this.getpage();
        },
        async getpage(){
            await this.$store.dispatch({
                type:'role/getAll'
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
            editRole:{},
            showModal:false,
            showEditModal:false,
            newRoleRule:{
                name:[{required:true,message:'Name is required',trigger: 'blur'}],
                displayName:[{required:true,message:'DisplayName is required',trigger: 'blur'}],
            },            
            roleRule:{
                name:[{required:true,message:'Name is required',trigger: 'blur'}],
                displayName:[{required:true,message:'DisplayName is required',trigger: 'blur'}],
            },
            columns:[{
                title:this.L('RoleName'),
                key:'name'
            },{
                title:this.L('DisplayName'),
                key:'displayName'
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
                                    this.editRole=this.roles[params.index];
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
                                        content:this.L('Delete role'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'role/delete',
                                                data:this.roles[params.index]
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
        roles(){
            return this.$store.state.role.roles;
        },
        permissions(){
            return this.$store.state.role.permissions;
        },
        totalCount(){
            return this.$store.state.role.totalCount;
        },
        currentPage(){
            return this.$store.state.role.currentPage;
        },
        pageSize(){
            return this.$store.state.role.pageSize;
        }
    },
    async created(){
        this.getpage();
        await this.$store.dispatch({
            type:'role/getAllPermissions'
        });
    }
}
</script>



