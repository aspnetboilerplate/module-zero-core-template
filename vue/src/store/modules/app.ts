import { appRouters, otherRouters } from '../../router/router'
import Util from '../../lib/util';
import Vue from 'vue';
import { Store, Module, ActionContext } from 'vuex'
import Vuex from 'vuex';
import ajax from '../../lib/ajax'
import appconst from '../../lib/appconst'
Vue.use(Vuex);
interface AppState {
    cachePage: Array<any>;
    lang: string;
    isFullScreen: boolean;
    openedSubmenuArr: Array<any>;
    menuTheme: string;
    themeColor: string,
    pageOpenedList: Array<any>;
    currentPageName: string;
    currentPath: Array<any>;
    menuList: Array<any>;
    routers: Array<any>;
    tagsList: Array<any>;
    messageCount: number;
    dontCache: Array<any>;
    noticeList: Array<any>;
}
class AppModule implements Module<AppState, any>{
    namespaced = true;
    state = {
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [],
        menuTheme: 'dark',
        themeColor: '',
        pageOpenedList: [{
            meta: { title: 'HomePage' },
            path: '',
            name: 'home'
        }],
        currentPageName: '',
        currentPath: [
            {
                meta: { title: 'HomePage' },
                path: '',
                name: 'home'
            }
        ],
        menuList: [],
        routers: [
            otherRouters,
            ...appRouters
        ],
        tagsList: [...otherRouters.children],
        messageCount: 0,
        dontCache: [],
        noticeList: [{ read: false, type: 0, title: 'First notice', description: 'One day ago' }, { read: false, type: 1 }, { read: false, type: 0, title: 'Second notice', description: 'One month ago' }]
    };
    mutations = {
        logout(state: AppState) {
            localStorage.clear();
            sessionStorage.clear();
        },
        setTagsList(state: AppState, list: Array<any>) {
            state.tagsList.push(...list);
        },
        updateMenulist(state: AppState) {
            let menuList: Array<Router> = [];
            appRouters.forEach((item, index) => {
                if (item.permission !== undefined) {
                    let hasPermissionMenuArr: Array<Router> = [];
                    hasPermissionMenuArr = item.children.filter(child => {
                        if (child.permission !== undefined) {
                            if (Util.abp.auth.hasPermission(child.permission)) {
                                return child;
                            }
                        } else {
                            return child;
                        }
                    });
                    if (hasPermissionMenuArr.length > 0) {
                        item.children = hasPermissionMenuArr;
                        menuList.push(item);
                    }
                } else {
                    if (item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            return child;
                        });
                        let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                        handledItem.children = childrenArr;
                        menuList.splice(len - 1, 1, handledItem);
                    }
                }
            });
            state.menuList = menuList;
        },
        changeMenuTheme(state: AppState, theme: string) {
            state.menuTheme = theme;
        },
        changeMainTheme(state: AppState, mainTheme: string) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu(state: AppState, name: any) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage(state: AppState, name: any) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage(state: AppState) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag(state: AppState, name: string) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList(state: AppState, get: any) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags(state: AppState) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags(state: AppState, vm: Vue) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList(state: AppState) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouters.children[0]];
        },
        setCurrentPath(state: AppState, pathArr: Array<any>) {
            state.currentPath = pathArr;
        },
        setCurrentPageName(state: AppState, name: string) {
            state.currentPageName = name;
        },
        clearOpenedSubmenu(state: AppState) {
            state.openedSubmenuArr.length = 0;
        },
        increateTag(state: AppState, tagObj: any) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
        }
    }
    actions = {
        async login(content: ActionContext<AppState, any>, payload: any) {
            let rep = await ajax.post("/api/TokenAuth/Authenticate", payload.data);
            var tokenExpireDate = payload.data.rememberMe ? (new Date(new Date().getTime() + 1000 * rep.data.result.expireInSeconds)) : undefined;
            Util.abp.auth.setToken(rep.data.result.accessToken, tokenExpireDate);
            Util.abp.utils.setCookieValue(appconst.authorization.encrptedAuthTokenName, rep.data.result.encryptedAccessToken, tokenExpireDate, Util.abp.appPath)
        },
    }
}
const appModule = new AppModule();
export default appModule;
