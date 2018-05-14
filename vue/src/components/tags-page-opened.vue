<style lang="less">
    @import '../views/main.less';
</style>

<template>
    <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">
        <div class="close-all-tag-con">
            <Dropdown transfer @on-click="handleTagsOption">
                <Button size="small" type="primary">
                    {{L('LabelOptions')}}
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="clearAll">{{L('ClearAll')}}</DropdownItem>
                    <DropdownItem name="clearOthers">{{L('ClearOthers')}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
            <transition-group name="taglist-moving-animation">
                <Tag 
                    type="dot"
                    v-for="item in pageTagsList" 
                    ref="tagsPageOpened"
                    :key="item.name" 
                    :name="item.name" 
                    @on-close="closePage"
                    @click.native="linkTo(item)"
                    :closable="item.name==='home'?false:true"
                    :color="item.children?(item.children[0].name===currentPageName?'blue':'default'):(item.name===currentPageName?'blue':'default')"
                >{{ itemTitle(item) }}</Tag>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../lib/util'
import AbpBase from '../lib/abpbase'
@Component
export default class TagsPageOpened extends AbpBase {
    constructor(){
        super();
        
    }
    created(){
        this.currentPageName=this.$route.name;
    }
    name:string= 'tagsPageOpened'
    currentPageName?:string;
    tagBodyLeft:number=0;
    refsTag:any|any[]=[];
    tagsCount:number=1;
    @Prop({type:Array}) pageTagsList:Array<any>;
    @Prop({type:Function,default:()=>{return true}}) beforePush:Function;
    get title(){
        return this.$store.state.app.currentTitle;
    }
    get tagsList(){
        return this.$store.state.app.pageOpenedList;
    }
    itemTitle (item:any) {
        return this.L(item.meta.title);
    }
    closePage (event:any, name:string) {
        this.$store.commit('app/removeTag', name);
        this.$store.commit('app/closePage', name);
        let pageOpenedList = this.$store.state.app.pageOpenedList;
        localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
        if (this.currentPageName === name) {
            let lastPageName = '';
            if (pageOpenedList.length > 1) {
                lastPageName = pageOpenedList[1].name;
            } else {
                lastPageName = pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        }
    }
    linkTo (item:any) {
        let routerObj:any = {};
        routerObj.name = item.name;
        if (item.argu) {
            routerObj.params = item.argu;
        }
        if (item.query) {
            routerObj.query = item.query;
        }
        if (this.beforePush(item)) {
            this.$router.push(routerObj);
        }
    }
    handlescroll (e:any) {
        var type = e.type;
        let delta = 0;
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
            delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
        }
        let left = 0;
        if (delta > 0) {
            left = Math.min(0, this.tagBodyLeft + delta);
        } else {
            let scrollCon=this.$refs.scrollCon as any;
            let scrollBody=this.$refs.scrollBody as any;
            if (scrollCon.offsetWidth - 100 < scrollBody.offsetWidth) {
                if (this.tagBodyLeft < -(scrollBody.offsetWidth - scrollCon.offsetWidth + 100)) {
                    left = this.tagBodyLeft;
                } else {
                        left = Math.max(this.tagBodyLeft + delta, scrollCon.offsetWidth - scrollBody.offsetWidth - 100);
                }
            } else {
                    this.tagBodyLeft = 0;
            }
        }
        this.tagBodyLeft = left;
    }
    handleTagsOption (type:any) {
        if (type === 'clearAll') {
            this.$store.commit('app/clearAllTags');
            this.$router.push({
                name: 'home'
            });
        } else {
            this.$store.commit('app/clearOtherTags', this);
        }
        this.tagBodyLeft = 0;
    }
    moveToView (tag:any) {
        let scrollCon=this.$refs.scrollCon as any;
        if (tag.offsetLeft < -this.tagBodyLeft) {
            this.tagBodyLeft = -tag.offsetLeft + 10;
        } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + scrollCon.offsetWidth - 100) {
        } else {
            this.tagBodyLeft = -(tag.offsetLeft - (scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
        }
    }
    mounted () {
        this.refsTag = this.$refs.tagsPageOpened;
        setTimeout(() => {
            (this.refsTag as Array<any>).forEach((item,index)=>{
                if (this.$route.name === item.name) {
                    let tag = this.refsTag[index].$el;
                    this.moveToView(tag);
                }
            })
        }, 1);
        this.tagsCount = this.tagsList.length;
    }
    @Watch('$route')
    routeChange(to:any){
        this.currentPageName = to.name;
        this.$nextTick(() => {
            (this.refsTag as Array<any>).forEach((item,index)=>{
                if (this.$route.name === item.name) {
                    let tag = this.refsTag[index].$el;
                    this.moveToView(tag);
                }
            })
        });
        this.tagsCount = this.tagsList.length;
    }
}
</script>
