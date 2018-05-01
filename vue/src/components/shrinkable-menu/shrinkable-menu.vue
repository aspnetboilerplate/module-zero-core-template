<template>
    <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
        <slot name="top"></slot>
        <sidebar-menu 
            v-show="!shrink"
            :menu-theme="theme" 
            :menu-list="menuList" 
            :open-names="openNames"
            @on-change="handleChange"
        ></sidebar-menu>
        <sidebar-menu-shrink 
            v-show="shrink"
            :menu-theme="theme" 
            :menu-list="menuList" 
            :icon-color="shrinkIconColor"
            @on-change="handleChange"
        ></sidebar-menu-shrink>
    </div>
</template>

<script lang="ts">
import sidebarMenu from './components/sidebarMenu.vue';
import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
import util from '../../lib/util';
import { Component, Vue,Inject,Prop,Emit } from 'vue-property-decorator';
@Component({
    components:{sidebarMenu,sidebarMenuShrink},
})
export default class ShrinkableMenu extends Vue {
    name:string='shrinkableMenu';
    @Prop() shrink:boolean;
    @Prop({required:true,type:Array}) menuList:Array<any>;
    @Prop({type:Array}) openNames:Array<string>;
    @Prop({type:Function}) beforePush:Function;
    @Prop({
           validator:(val)=>{return util.oneOf(val, ['dark', 'light']);}
    }) theme:string;
    get bgColor(){
            return this.theme === 'dark' ? '#001529' : '#fff';
    }
    get shrinkIconColor () {
        return this.theme === 'dark' ? '#fff' : '#495060';
    }
    @Emit('on-change')
    handleChange(name:string){
        let willpush = true;
        if (this.beforePush !== undefined) {
            if (!this.beforePush(name)) {
                willpush = false;
            }
        }
        if (willpush) {
            this.$router.push({name:name})
        }
    }
}
</script>
