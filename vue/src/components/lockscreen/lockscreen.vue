<template>
    <div @click="lock" class="lock-screen-btn-con">
        <Tooltip :content="L('LockScreen')" placement="bottom">
            <!-- <Icon type="locked" :size="20"></Icon> -->
            <i class="iconfont" style="font-size:20px">&#xe6c0;</i>
        </Tooltip>
    </div>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import AbpBase from '../../lib/abpbase'
import Cookies from 'js-cookie';
@Component
export default class LockScreen extends AbpBase {
    name:string= 'lockScreen';
    lockScreenSize:number=0;
    showUnlock:boolean=false;
    @Prop({type:Boolean,default:false}) value:boolean;

    lock() {
        let lockScreenBack = document.getElementById('lock_screen_back') as HTMLElement;
        if(lockScreenBack){
        lockScreenBack.style.transition = 'all 3s';
        lockScreenBack.style.zIndex = "10000";
        lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset';
        this.showUnlock = true;
        let name=this.$route.name?this.$route.name:'';
        Cookies.set('last_page_name', name);
        setTimeout(() => {
            lockScreenBack.style.transition = 'all 0s';
            this.$router.push({
                name: 'locking'
            });
        }, 800);
        Cookies.set('locking', '1');}
    }
    mounted () {
        let lockdiv = document.createElement('div');
        lockdiv.setAttribute('id', 'lock_screen_back');
        lockdiv.setAttribute('class', 'lock-screen-back');
        document.body.appendChild(lockdiv);
        let lockScreenBack = document.getElementById('lock_screen_back') as HTMLElement;
        let x = document.body.clientWidth;
        let y = document.body.clientHeight;
        let r = Math.sqrt(x * x + y * y).toString();
        let size = parseInt(r);
        this.lockScreenSize = size;
        window.addEventListener('resize', () => {
            let x = document.body.clientWidth;
            let y = document.body.clientHeight;
            let r = Math.sqrt(x * x + y * y).toString();
            let size = parseInt(r);
            this.lockScreenSize = size;
            lockScreenBack.style.transition = 'all 0s';
            lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
        });
        lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
    }
}
</script>

