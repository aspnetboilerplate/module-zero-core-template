import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import {router} from './router/index';
//import 'iview/dist/styles/iview.css';
import './theme.less';
import Vuex from 'vuex';
import Ajax from './lib/ajax';
import Util from './lib/util'
import SignalRAspNetCoreHelper from './lib/SignalRAspNetCoreHelper'
Vue.use(iView);
//Vue.use(Vuex)
import store from './store/index';
Vue.config.productionTip = false
import { appRouters,otherRouters} from './router/router'
let language=navigator.language;
(window as any).abp.utils.setCookieValue('Abp.Localization.CultureName',language,new Date(new Date().getTime() + 5 * 365 * 86400000),
(window as any).abp.appPath);
Ajax.get('/AbpUserConfiguration/GetAll').then(data=>{
  Util.abp=Util.extend(true,Util.abp,data.data.result);
  new Vue({
    render: h => h(App),
    router:router,
    store:store,
    data: {
      currentPageName: ''
    },
    async mounted () {
      this.currentPageName = this.$route.name as string;
      await this.$store.dispatch({
        type:'session/init'
      })
      if(!!this.$store.state.session.user&&this.$store.state.session.application.features['SignalR']){
        if (this.$store.state.session.application.features['SignalR.AspNetCore']) {
            SignalRAspNetCoreHelper.initSignalR();
        }
      }
      this.$store.commit('app/initCachepage');
      // 权限菜单过滤相关
      this.$store.commit('app/updateMenulist');
    },
    created () {
      let tagsList:Array<any> = [];
      appRouters.map((item) => {
          if (item.children.length <= 1) {
              tagsList.push(item.children[0]);
          } else {
              tagsList.push(...item.children);
          }
      });
      this.$store.commit('app/setTagsList', tagsList);
    }
  }).$mount('#app')
})

