<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <a>
            <img class="logo"/>
            <span class="title">{{L('AppName')}}</span>
          </a>
        </div>
        <div class="desc">
          {{L('WelcomeMessage')}}
        </div>
      </div>
      <div class="main">
        <div v-if="!!tenant" class="tenant-title"><a @click="showChangeTenant=true">{{L('CurrentTenant')}}:{{tenant.name}}</a></div>
        <div v-if="!tenant" class="tenant-title"><a @click="showChangeTenant=true">{{L('NotSelected')}}</a></div>
        <Form ref="loginform" :rules="rules" :model="loginModel">
          <FormItem prop="userNameOrEmailAddress">
            <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
              <i class="ivu-icon ivu-icon-ios-person-outline ivu-input-icon ivu-input-icon-normal" style="left:0"></i>
              <input v-model="loginModel.userNameOrEmailAddress" autocomplete="off" spellcheck="false" type="text" :placeholder="L('UserNamePlaceholder')" class="ivu-input ivu-input-large" style="padding-left:32px;padding-right:0">
            </div>
          </FormItem>
          <FormItem prop="password">
            <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
              <i class="ivu-icon ivu-icon-ios-locked-outline ivu-input-icon ivu-input-icon-normal" style="left:0"></i>
              <input v-model="loginModel.password" autocomplete="off" spellcheck="false" type="password" :placeholder="L('PasswordPlaceholder')" class="ivu-input ivu-input-large" style="padding-left:32px;padding-right:0">
            </div>
          </FormItem>
        </Form>
        <div>
          <Checkbox v-model="loginModel.rememberMe" size="large">{{L('RememberMe')}}</Checkbox>
          <a style="float:right;font-size: 14px;margin-top: 3px;">{{L('ForgetPassword')}}</a>
        </div>
        <div style="margin-top:15px">
          <Button type="primary" @click="login" long size="large">{{L('LogIn')}}</Button>
        </div>
        <language-switch></language-switch>
      </div>
    </div>
    <Footer :copyright="L('CopyRight')"></Footer>
    <tenant-switch v-model="showChangeTenant"></tenant-switch>
  </div>
</template>
<script lang="ts">
import { Component, Vue,Inject } from 'vue-property-decorator';
import Footer from '../components/Footer.vue'
import TenantSwitch from '../components/tenant-switch.vue'
import LanguageSwitch from '../components/language-switch.vue'
import iView from 'iview';
import AbpBase from '../lib/abpbase'
@Component({
  components:{Footer,TenantSwitch,LanguageSwitch}
})
export default class Login extends AbpBase {
  loginModel={
    userNameOrEmailAddress:'',
    password:'',
    rememberMe:false
  }
  showChangeTenant:boolean=false
  async login(){
    (this.$refs.loginform as any).validate(async (valid:boolean)=>{
       if(valid){
          this.$Message.loading({
            content:this.L('LoginPrompt'),
            duration:0
          })
          await this.$store.dispatch({
            type:'app/login',
            data:this.loginModel
          })
          sessionStorage.setItem('rememberMe',this.loginModel.rememberMe?'1':'0');
        location.reload();
       }
    });      
  }
  get tenant(){
    return this.$store.state.session.tenant;
  }
  rules={
    userNameOrEmailAddress: [
      { required: true, message: this.L('UserNameRequired'), trigger: 'blur' }
    ],
    password: [
      { required: true, message: this.L('PasswordRequired'), trigger: 'blur' }
    ]
  }
  created(){
  }
}
</script>
<style scoped>  
  .container{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 100%;
    background: #f0f2f5;
  }
  @media (min-width: 768px){.container{
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
    font-size: 18px;
  }}
  .content{
    padding: 32px 0;
    -ms-flex: 1 1 0%;
    flex: 1 1 0%;
  }
  .main{
    width: 368px;
    margin: 0 auto;
  }
  @media (min-width:768px) {
    .content{
      padding: 112px 0 24px
    }
  }
  .top{
    text-align: center
  }
  .header{
    height: 44px;
    line-height: 44px;
  }
  .logo{
    height: 44px;
    vertical-align: top;
    margin-right: 16px;
  }
  .title{
    font-size: 33px;
    color: rgba(0,0,0,.85);
    font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
  }
  .desc {
    font-size: 14px;
    color: rgba(0,0,0,.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }
  .tenant-title{
    margin-bottom: 24px;
    text-align: center;
  }
  
</style>

