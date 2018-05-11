import Vue from 'vue';
import VueRouter from 'vue-router';
import {routers} from './router';
import iView from 'iview';
import Util from '../lib/util';
import Cookies from 'js-cookie'
import { appRouters,otherRouters} from './router'

Vue.use(VueRouter);

const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
        next({
            replace: true,
            name: 'locking'
        });
    }else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {
        if (!Util.abp.session.userId&& to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (!!Util.abp.session.userId && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            Util.title(to.meta.title);
            next({
                name: 'home'
            });
        } else {
            const curRouterObj = Util.getRouterObjByName([otherRouters, ...appRouters], to.name);
            if (curRouterObj && curRouterObj.permission) { // 需要判断权限的路由
                if (window.abp.auth.hasPermission(curRouterObj.permission)) {
                    Util.toDefaultPage([otherRouters, ...appRouters], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else { // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...routers], to.name, router, next);
            }
        }
    }
});
router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});