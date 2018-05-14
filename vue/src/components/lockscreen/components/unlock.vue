<style lang="less">
    @import '../styles/unlock.less';
</style>
<template>
    <transition name="show-unlock">
        <div class="unlock-body-con" v-if="showUnlock" @keydown.enter="handleUnlock">
            <div @click="handleClickAvator" class="unlock-avator-con" :style="{marginLeft: avatorLeft}">
                <img class="unlock-avator-img" src="../../../images/usericon.jpg">
                <div  class="unlock-avator-cover">
                    <span><Icon type="unlocked" :size="30"></Icon></span>
                    <p>{{L('UnLock')}}</p>
                </div>
            </div>
            <div class="unlock-avator-under-back" :style="{marginLeft: avatorLeft}"></div>
            <div class="unlock-input-con">
                <div class="unlock-input-overflow-con">
                    <div class="unlock-overflow-body" :style="{right: inputLeft}">
                        <input ref="inputEle" v-model="password" class="unlock-input" type="password" :placeholder="L('PasswordPlaceholder')" />
                        <button ref="unlockBtn" @mousedown="unlockMousedown" @mouseup="unlockMouseup" @click="handleUnlock" class="unlock-btn"><Icon color="white" type="key"></Icon></button>
                    </div>
                </div>
            </div>
            <div class="unlock-locking-tip-con">{{L('Locked')}}</div>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import AbpBase from '../../../lib/abpbase'
import Cookies from 'js-cookie';
@Component
export default class UnLock extends AbpBase {
    name:string='Unlock';
    avatorLeft:string='0px';
    inputLeft:string= '400px';
    password:string= '';
    check=null;
    @Prop({type:Boolean,default:false}) showUnlock:boolean;
    get avatorPath(){
        return localStorage.avatorImgPath;
    }
    async validator () {
        let loginModel={
            userNameOrEmailAddress:this.$store.state.session.user.userName,
            password:this.password,
            rememberMe:false
        }
        if(sessionStorage.getItem('rememberMe')==='1'){
            loginModel.rememberMe=true;
        }
        await this.$store.dispatch({
            type:'app/login',
            data:loginModel
        }) 
        return true;         
    }
    handleClickAvator () {
        this.avatorLeft = '-180px';
        this.inputLeft = '0px';
        (this.$refs.inputEle as any).focus();
    }
    async handleUnlock () {
        if (await this.validator()) {
            this.avatorLeft = '0px';
            this.inputLeft = '400px';
            this.password = '';
            Cookies.set('locking', '0');
            this.$emit('on-unlock');
        } else {
            this.$Message.error('WrongPassword,Wrong password');
        }
    }
    unlockMousedown () {
        (this.$refs.unlockBtn as any).className = 'unlock-btn click-unlock-btn';
    }
    unlockMouseup () {
        (this.$refs.unlockBtn as any).className = 'unlock-btn';
    }
    
}
</script>
