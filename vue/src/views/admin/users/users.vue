<template>
    <div>
        <Card>
            <p slot="title">{{'Users'|l}}</p>
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
            <Table :columns="columns" border :data="users"></Table>
            <Page :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
        </Card>
        <Modal v-model="showModal" :title="L('CreateNewUser')" @on-ok="save" :okText="L('save')" :cancelText="L('cancel')">
            <div>
                <Form ref="newUserForm" label-position="top" :rules="newUserRule" :model="editUser">
                    <Tabs value="detail">
                        <TabPane :label="L('UserDetails')" name="detail">
                            <FormItem :label="L('UserName')" prop="userName">
                                <Input v-model="editUser.userName" :maxlength="32" :minlength="2"></Input>
                            </FormItem>
                            <FormItem :label="L('Name')" prop="name">
                                <Input v-model="editUser.name" :maxlength="32"></Input>
                            </FormItem>
                            <FormItem :label="L('Surname')" prop="surname">
                                <Input v-model="editUser.surname" :maxlength="1024"></Input>
                            </FormItem>
                            <FormItem :label="L('EmailAddress')" prop="emailAddress">
                                <Input v-model="editUser.emailAddress" type="email" :maxlength="32"></Input>
                            </FormItem>
                            <FormItem :label="L('Password')" prop="password">
                                <Input v-model="editUser.password" type="password" :maxlength="32"></Input>
                            </FormItem>
                            <FormItem :label="L('ConfirmPassword')" prop="confirmPassword">
                                <Input v-model="editUser.confirmPassword" type="password" :maxlength="32"></Input>
                            </FormItem>
                            <FormItem>
                                <Checkbox v-model="editUser.isActive">{{'IsActive'|l}}</Checkbox>
                            </FormItem>
                        </TabPane>
                        <TabPane :label="L('UserRoles')" name="roles">
                            <CheckboxGroup v-model="editUser.roleNames">
                                <Checkbox :label="role.normalizedName" v-for="role in roles" :key="role.id"><span>{{role.name}}</span></Checkbox>
                            </CheckboxGroup>
                        </TabPane>
                    </Tabs>
                    
                </Form>
            </div>
            <div slot="footer">
                <Button @click="showModal=false">{{'Cancel'|l}}</Button>
                <Button @click="save" type="primary">{{'Save'|l}}</Button>
            </div>
        </Modal>
        <Modal v-model="showEditModal" :title="L('EditUser')" @on-ok="save" :okText="L('save')" :cancelText="L('cancel')">
            <div>
                <Form ref="userForm" label-position="top" :rules="userRule" :model="editUser">
                    <Tabs value="detail">
                        <TabPane :label="L('UserDetails')" name="detail">
                            <FormItem :label="L('UserName')" prop="userName">
                                <Input v-model="editUser.userName" :maxlength="32" :minlength="2"></Input>
                            </FormItem>
                            <FormItem :label="L('Name')" prop="name">
                                <Input v-model="editUser.name" :maxlength="32"></Input>
                            </FormItem>
                            <FormItem :label="L('Surname')" prop="surname">
                                <Input v-model="editUser.surname" :maxlength="1024"></Input>
                            </FormItem>
                            <FormItem :label="L('EmailAddress')" prop="emailAddress">
                                <Input v-model="editUser.emailAddress" type="email" :maxlength="32"></Input>
                            </FormItem>
                            <FormItem>
                                <Checkbox v-model="editUser.isActive">{{'IsActive'|l}}</Checkbox>
                            </FormItem>
                        </TabPane>
                        <TabPane :label="L('UserRoles')" name="roles">
                            <CheckboxGroup v-model="editUser.roleNames">
                                <Checkbox :label="role.normalizedName" v-for="role in roles" :key="role.id"><span>{{role.name}}</span></Checkbox>
                            </CheckboxGroup>
                        </TabPane>
                    </Tabs>                    
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
            this.editUser={isActive:true};
            this.showModal=true;
        },
        async save(){
            if(!!this.editUser.id){
                this.$refs.userForm.validate(async (val)=>{
                    if(val){
                        await this.$store.dispatch({
                            type:'user/update',
                            data:this.editUser
                        })
                        this.showEditModal=false;
                        await this.getpage();
                    }
                })
                
            }else{
                this.$refs.newUserForm.validate(async (val)=>{
                    if(val){
                        await this.$store.dispatch({
                            type:'user/create',
                            data:this.editUser
                        })
                        this.showModal=false;
                        await this.getpage();
                    }
                })
            }
            
        },
        pageChange(page){
            this.$store.commit('user/setCurrentPage',page);
            this.getpage();
        },
        pagesizeChange(pagesize){
            this.$store.commit('user/setPageSize',pagesize);
            this.getpage();
        },
        async getpage(){
            await this.$store.dispatch({
                type:'user/getAll'
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
        const validatePassCheck = (rule, value, callback) => {
            if (!value) {
                callback(new Error('Please enter your password again'));
            } else if (value !== this.editUser.password) {
                callback(new Error('The two input passwords do not match!'));
            } else {
                callback();
            }
        };
        return{
            editUser:{},
            showModal:false,
            showEditModal:false,
            newUserRule:{
                userName:[{required: true,message:'User Name is required',trigger: 'blur'}],
                name:[{required:true,message:'Name is required',trigger: 'blur'}],
                surname:[{required:true,message:'Surname is required',trigger: 'blur'}],
                emailAddress:[{required:true,message:'Email is required',trigger: 'blur'},{type: 'email'}],
                password:[{required:true,message:'Password is required',trigger: 'blur'}],
                confirmPassword:{validator:validatePassCheck,trigger: 'blur'}
            },
            
            userRule:{
                userName:[{required: true,message:'User Name is required',trigger: 'blur'}],
                name:[{required:true,message:'Name is required',trigger: 'blur'}],
                surname:[{required:true,message:'Surname is required',trigger: 'blur'}],
                emailAddress:[{required:true,message:'Email is required',trigger: 'blur'},{type: 'email'}],
            },
            columns:[{
                title:this.L('UserName'),
                key:'userName'
            },{
                title:this.L('FullName'),
                key:'fullName'
            },{
                title:this.L('EmailAddress'),
                key:'emailAddress'
            },{
                title:this.L('IsActive'),
                render:(h,params)=>{
                    return h('Checkbox',{
                        props:{
                            value:this.users[params.index].isActive,
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
                                    this.editUser=this.users[params.index];
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
                                        content:this.L('Delete user'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'user/delete',
                                                data:this.users[params.index]
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
        users(){
            return this.$store.state.user.users;
        },
        roles(){
            return this.$store.state.user.roles;
        },
        totalCount(){
            return this.$store.state.user.totalCount;
        },
        currentPage(){
            return this.$store.state.user.currentPage;
        },
        pageSize(){
            return this.$store.state.user.pageSize;
        }
    },
    async created(){
        this.getpage();
        await this.$store.dispatch({
            type:'user/getRoles'
        });
    }
}
</script>


