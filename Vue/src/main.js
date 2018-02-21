import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import abp from './abp'
import $ from 'jquery'
import AppConsts from './libs/appconst'

util.ajax.get('/AbpUserConfiguration/GetAll').then(result=>{
    Vue.use(VueI18n);
    Vue.use(iView);
    window.abp=$.extend(true,abp,result.data.result);
    Vue.prototype.L=function(text,...args){
        let localizedText=window.abp.localization.localize(text,AppConsts.localization.defaultLocalizationSourceName);
        if (!localizedText) {
            localizedText=text;
        }
        if (!args || !args.length) {
            return localizedText;
        }
        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, args)
    }
    Vue.filter('l', function (value) {
        if (!value) return ''
        return window.abp.localization.localize(value,AppConsts.localization.defaultLocalizationSourceName);
    })
    new Vue({
        el: '#app',
        router: router,
        store: store,
        render: h => h(App),
        data: {
            currentPageName: ''
        },
        mounted () {
            this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            this.$store.commit('initCachepage');
        // 权限菜单过滤相关
            this.$store.commit('updateMenulist');
        // iview-admin检查更新
        },
        created () {
            let tagsList = [];
            appRouter.map((item) => {
                if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
            });
            this.$store.commit('setTagsList', tagsList);
        }
    });
})
