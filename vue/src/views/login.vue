<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    <span v-if="isMultiTenancyEnabled" class="multi-tenancy">{{'CurrentTenant'|l}}:<span v-if="tenant" class="tenant-name"> {{tenant.name}}</span><span v-if="!tenant"> {{'NotSelected'|l}}</span></span>
                </p>
                <a href="#" slot="extra" @click="showChangeModal">
                   {{'Change'|l}}
                </a>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userNameOrEmailAddress">
                            <Input v-model="form.userNameOrEmailAddress" :placeholder="'UserNameOrEmail'|l">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" :placeholder="'Password'|l">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <div style="margin-bottom:10px">
                            <Checkbox v-model="form.rememberClient">{{'RememberMe'|l}}</Checkbox>
                        </div>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>{{'LogIn'|l}}</Button>
                        </FormItem>
                    </Form>
                    <div>
                        <ul class="language-ul">
                            <li v-for="language in languages" v-if="language.displayName!==currentLanguage.displayName" @click="changeLanguage(language.name)">
                                <Tooltip :content="language.displayName" placement="bottom"><a><i :class="language.icon"></i></a></Tooltip>
                            </li>
                        </ul>
                    </div>
                    <p class="login-tip">{{'PleaseEnterLoginInformation'|l}}</p>
                </div>
            </Card>
        </div>
        <Modal
         :title="'ChangeTenant'|l"
         v-model="modalShow"
         @on-ok="changeTenant"
        >
             <Input :placeholder="'TenancyName' | l" v-model="changedTenancyName"></Input>
             <p>{{'LeaveEmptyToSwitchToHost' | l}}</p>
             <div slot="footer">
                <Button @click="modalShow=false">{{'Cancel'|l}}</Button>
                <Button @click="changeTenant" type="primary">{{'Save'|l}}</Button>
             </div>
        </Modal>
    </div>
</template>

<script>

import Cookies from 'js-cookie';
export default {
    data () {
        return {
            languages:[],
            currentLanguage:{},
            isMultiTenancyEnabled:abp.multiTenancy.isEnabled,
            changedTenancyName:'',
            modalShow:false,
            isMultiTenancyEnabled:true,
            form: {
                userNameOrEmailAddress: '',
                password: '',
                rememberClient:false
            },
            rules: {
                userNameOrEmailAddress: [
                    { required: true, message: this.L('ThisFieldIsRequired'), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: this.L('ThisFieldIsRequired'), trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        changeLanguage(languageName){
            abp.utils.setCookieValue(
                "Abp.Localization.CultureName",
                languageName,
                new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
                abp.appPath
            );
            location.reload();
        },
        showChangeModal(){
            this.modalShow=true;
        },
        async changeTenant(){
            if (!this.changedTenancyName) {
                abp.multiTenancy.setTenantIdCookie(undefined);;
                this.modalShow = false;
                location.reload();
                return;
            }else{
                let tenant = await this.$store.dispatch({
                    type:'account/isTenantAvailable',
                    data:{tenancyName:this.changedTenancyName}
                })
                switch(tenant.state){
                    case 1:
                        abp.multiTenancy.setTenantIdCookie(tenant.tenantId);
                        location.reload();
                        return;
                    case 2:
                        let message=this.L('TenantIsNotActive',this.changedTenancyName)
                        this.$Modal.error({
                            title:'',
                            content:message
                        });
                        break;
                    case 3:
                        let message2 = this.L('ThereIsNoTenantDefinedWithName{0}',this.changedTenancyName)
                        this.$Modal.error({
                            title:'',
                            content:message2
                        });
                        break;
                }

                this.modalShow=false;
                this.modalShow=true;
            }
        },
        async handleSubmit () {
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    this.$Message.loading({
                        content: this.L('PleaseWait'),
                        duration:0
                    });

                let self = this;

                await this.$store.dispatch({
                    type: 'user/login',
                    data: self.form
                 }).then(response => {
                    Cookies.set('userNameOrEmailAddress', self.form.userNameOrEmailAddress);
                    location.reload();
                }, (error) => {
                    this.$Modal.error({
                        title:'',
                        content: 'Login failed !'
                    });
                    this.$Message.destroy();
                });
                }
            });
        }
    },
    created(){
        this.languages=abp.localization.languages.filter(val=>{
            return !val.isDisabled;
        });
        this.currentLanguage=abp.localization.currentLanguage
        this.isMultiTenancyEnabled=abp.multiTenancy.isEnabled;
    },
    computed:{
        tenant(){
            return this.$store.state.session.tenant;
        }
    }
};
</script>

<style>
.language-ul{
    text-align: center;
}
.language-ul li{
    display: inline;
    margin: 2px;
}
.famfamfam-flags {
    display: inline-block;
}
</style>
