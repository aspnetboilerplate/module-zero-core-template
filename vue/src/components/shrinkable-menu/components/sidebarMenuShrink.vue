<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer v-if="item.children.length !== 1" placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 80px;margin-right:5px;padding:10px 0;" type="text">
                        <i class="iconfont" v-html="item.icon" style="color:white"></i>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.name" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(child) }}</span></DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu" style="left:100px">
                    <Button @click="changeMenu(item.children[0].name)" style="width: 80px;margin-right:5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem :name="item.children[0].name" :key="'d' + index"><Icon :type="item.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue,Inject,Prop,Emit } from 'vue-property-decorator';
import AbpBase from '../../../lib/abpbase'
@Component
export default class extends AbpBase {
    name:string='sidebarMenuShrink';
    @Prop({type:Array}) menuList:Array<any>;
    @Prop({default:'white'}) iconColor:string;
    @Prop({default:'darck'}) menuTheme:string;
    @Emit('on-change') changeMenu(active:string){

    }
    itemTitle(item:any){
        return this.L(item.meta.title);
    }
}
</script>
