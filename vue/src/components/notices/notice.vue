<template>
    <div class="lock-screen-btn-con">
        <Poptip placement="bottom-end" @on-popper-show="getNotices">
            <Badge :count="unReadCount" dot>
                <i class="iconfont" style="font-size:20px">&#xe70a;</i>
            </Badge>
                <div slot="content" class="content">
                    <Tabs value="notice">
                        <TabPane :label="noticeLabel" name="notice">
                            <div class="noFound" v-if="!noticeCount">
                                <i class="iconfont">&#xe70a;</i>
                                <div class="noTitle">{{L('NoNotice')}}</div>
                            </div>
                            <div v-if="noticeCount">
                                <div class="list">
                                    <Spin size="large" fix v-if="noticeSpinShow"></Spin>
                                    <div class="list-item" v-for="(notice,index) in noticeArray" :key="index">
                                        <div class="list-item-meta">
                                            <div class="list-item-meta-content">
                                                <h4 class="list-item-meta-title">
                                                    <div class="title">{{notice.title}}</div>
                                                </h4>
                                                <div class="list-item-meta-description">
                                                    <div class="description">{{notice.description}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane :label="messageLabel" name="message">
                            <div class="noFound" v-if="!messageCount">
                                <i class="iconfont">&#xe66b;</i>
                                <div class="noTitle">{{L('NoMessage')}}</div>
                            </div>
                            <div  v-if="messageCount">
                                <Spin size="large" fix v-if="noticeSpinShow"></Spin>
                                    <div class="list-item" v-for="(message,index) in messageArray" :key="index">
                                        <div class="list-item-meta">
                                            <div class="list-item-meta-content">
                                                <h4 class="list-item-meta-title">
                                                    <div class="title">{{message.title}}</div>
                                                </h4>
                                                <div class="list-item-meta-description">
                                                    <div class="description">{{message.description}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </TabPane>
                        <TabPane :label="taskLabel" name="task">
                            <div class="noFound" v-if="!taskCount">
                                <i class="iconfont">&#xe6b2;</i>
                                <div class="noTitle">{{L('NoTask')}}</div>
                            </div>
                            <div  v-if="taskCount">
                                <Spin size="large" fix v-if="noticeSpinShow"></Spin>
                                    <div class="list-item" v-for="(task,index) in taskArray" :key="index">
                                        <div class="list-item-meta">
                                            <div class="list-item-meta-content">
                                                <h4 class="list-item-meta-title">
                                                    <div class="title">{{task.title}}</div>
                                                </h4>
                                                <div class="list-item-meta-description">
                                                    <div class="description">{{task.description}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
        </Poptip>
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import AbpBase from '../../lib/abpbase'
@Component
export default class Notice extends AbpBase{
    noticeSpinShow:boolean=true;
    get noticeList():Array<any>{
        return this.$store.state.app.noticeList;
    }
    get unReadCount(){
        return this.noticeList.filter(n=>n.read==false).length
    }
    get noticeArray(){
        return this.noticeList.filter(n=>n.read==false&&n.type===0)
    }
    get noticeCount(){
        return this.noticeList.filter(n=>n.read==false&&n.type===0).length
    }
    get messageArray(){
        return this.noticeList.filter(n=>n.read==false&&n.type===1)
    }
    get messageCount(){
        return this.noticeList.filter(n=>n.read==false&&n.type===1).length
    }
    get taskArray(){
        return this.noticeList.filter(n=>n.read==false&&n.type===2)
    }
    get taskCount(){
        return this.noticeList.filter(n=>n.read==false&&n.type===2).length
    }
    get noticeLabel(){
        let name=this.L('Notice');
        if(this.noticeCount>0){
            return `${name}(${this.noticeCount})`
        }else{
            return name
        }
    }
    get messageLabel(){
        let name=this.L('Message');
        if(this.messageCount>0){
            return `${name}(${this.messageCount})`
        }else{
            return name
        }
    }
    get taskLabel(){
        let name=this.L('Task')
        if(this.taskCount>0){
            return `${name}(${this.taskCount})`
        }else{
            return name
        }
    }
    getNotices(){
        setTimeout(()=>{
            this.noticeSpinShow=false;
        },2000)
    }
}
</script>
<style scoped>
    .content{
        padding:-8px -16px;
    }
    .noFound{
        text-align: center;
        padding: 73px 0 88px;
        color: rgba(0,0,0,.45);
    }
    .noFound .iconfont{
        font-size: 40px;
        margin-bottom: 15px;
    }
    .noTitle{
        font-size: 14px;
    }
    .list{
        max-height: 400px;
        overflow: auto;
        font-family: "Monospaced Number","Chinese Quote",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(0,0,0,.65);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
        position: relative;
    }
    .list * {
        outline: none;
    }
    .list-item {
        border-bottom: 1px solid #e8e8e8;
    }
    .list-item {
        -ms-flex-align: center;
        align-items: center;
        display: -ms-flexbox;
        display: flex;
        padding-top: 12px;
        padding-bottom: 12px;
    }
    .list-item:hover{
        background: #e6f7ff;
    }
    .list-item-meta{
        -ms-flex-align: start;
        align-items: flex-start;
        display: -ms-flexbox;
        display: flex;
        -ms-flex: 1 1 0%;
        flex: 1 1 0%;
        font-size: 0;
        width: 100%
    }
    .list-item-meta-avatar {
        margin-right: 16px;
    } 
    .ant-list-item-meta-content {
        -ms-flex: 1 0 0%;
        flex: 1 0 0%;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 0%;
    } 
    .list-item-meta-title {
        color: rgba(0,0,0,.65);
        margin-bottom: 4px;
        font-size: 14px;
        line-height: 22px;
    } 
    .list-item-meta-title .title{
        font-weight: normal;
        margin-bottom: 8px;
        text-align: left;
    }
    .list-item-meta-title .extra{
        float: right;
        color: rgba(0,0,0,.45);
        font-weight: normal;
        margin-right: 0;
        margin-top: -1.5px
    }
    .list-item-meta-description {
        color: rgba(0,0,0,.45);
        font-size: 14px;
        line-height: 22px;
    }
    .list-item-meta-description .description{
        font-size: 12px;
        line-height: 1.5;
        text-align: left;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

