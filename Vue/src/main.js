import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import AppConsts from './libs/appconst'

util.ajax.get('/AbpUserConfiguration/GetAll').then(result => {
    Vue.use(VueI18n);
    Vue.use(iView);

    window.abp = $.extend(true, abp, result.data.result);
    
    Vue.prototype.L = function (text, ...args) {
        let localizedText = window.abp.localization.localize(text, AppConsts.localization.defaultLocalizationSourceName);
        if (!localizedText) {
            localizedText = text;
        }
        if (!args || !args.length) {
            return localizedText;
        }
        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, args)
    }

    Vue.filter('l', function (value) {
        if (!value) return ''
        return window.abp.localization.localize(value, AppConsts.localization.defaultLocalizationSourceName);
    });

    new Vue({
        el: '#app',
        router: router,
        store: store,
        render: h => h(App),
        data: {
            currentPageName: ''
        },
        mounted() {
            this.currentPageName = this.$route.name;
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            this.$store.commit('initCachepage');
            // 权限菜单过滤相关
            this.$store.commit('updateMenulist');
            // iview-admin检查更新
        },
        created() {
            let tagsList = [];
            appRouter.map((item) => {
                if (item.children.length <= 1) {
                    tagsList.push(item.children[0]);
                } else {
                    tagsList.push(...item.children);
                }
            });

            this.$store.commit('setTagsList', tagsList);
            abp.message.info = (message, title) => {
                this.$Modal.info({
                    title: title,
                    content: message
                })
            };

            abp.message.success = (message, title) => {
                this.$Modal.success({
                    title: title,
                    content: message
                })
            };

            abp.message.warn = (message, title) => {
                this.$Modal.warning({
                    title: title,
                    content: message
                })
            };

            abp.message.error = (message, title) => {
                this.$Modal.error({
                    title: title,
                    content: message
                })
            };

            abp.message.confirm = (message, titleOrCallback, callback) => {
                var userOpts = {
                    content: message
                };
                if ($.isFunction(titleOrCallback)) {
                    callback = titleOrCallback;
                } else if (titleOrCallback) {
                    userOpts.title = titleOrCallback;
                };
                userOpts.onOk = callback || function () { };
                this.$Modal.confirm(userOpts);
            }

            abp.notify.success = (message, title, options) => {
                this.$Notice.success({
                    title: title,
                    desc: message
                })
            };

            abp.notify.info = (message, title, options) => {
                this.$Notice.info({
                    title: title,
                    desc: message
                })
            };

            abp.notify.warn = (message, title, options) => {
                this.$Notice.warning({
                    title: title,
                    desc: message
                })
            };

            abp.notify.error = (message, title, options) => {
                this.$Notice.error({
                    title: title,
                    desc: message
                })
            };
        }
    });
})