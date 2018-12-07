import Vue from 'vue';
import {FieldType,CompareType,Filter} from '../store/entities/filter'
import appconst from './appconst'
class Util{
    abp:any=window.abp;
    loadScript(url:string){
        var script=document.createElement('script');
        script.type="text/javascript";
        script.src=url;
        document.body.appendChild(script);
    }
    buildFilters(filters:Filter[]){
        let fileswhere:string[]=[];
        filters.forEach(f=>{
            let where='';
            if(f.Type===FieldType.Number){
                where=this.buildNumber(f);
            }else if(f.Type===FieldType.String){
                where=this.buildString(f);
            }else if(f.Type===FieldType.Boolean){
                where=this.buildBoolean(f);
            }else if(f.Type===FieldType.DataRange||f.Type===FieldType.Date){
                where=this.buildDate(f);
            }else if(f.Type===FieldType.Enum){
                where=this.buildEnum(f);
            }
            if(where){
                fileswhere.push(where);
            }
            
        })
        return fileswhere.join(' AND ');
    }
    private buildDate(filter:Filter){        
        if(filter.Type===FieldType.Date){
            if(!!filter.Value){ 
                let compare=this.caseCompare(filter.CompareType);
                let date=new Date(filter.Value);
                return `${filter.FieldName}${compare} DateTime(${date.getFullYear()},${date.getMonth()+1},${date.getDate()})`;
            }else{
                return ''
            }
        }else if(filter.Type===FieldType.DataRange){
            if(!!filter.Value){
                let dates=filter.Value as Array<Date>;
                if(dates.length!==2){
                    throw 'Dates format is error';
                }else if(dates[0]&&dates[1]){
                    return `(${filter.FieldName}>= DateTime(${dates[0].getFullYear()},${dates[0].getMonth()+1},${dates[0].getDate()}) AND ${filter.FieldName}<= DateTime(${dates[1].getFullYear()},${dates[1].getMonth()+1},${dates[1].getDate()}))`;
                }else{
                    return ''
                }
            }else{
                return ''
            }
        }else{
            return ''
        }
    }
    private buildEnum(filter:Filter){
        let compare=this.caseCompare(filter.CompareType);
        return `${filter.FieldName}${compare}"${filter.Value}"`;
    }
    private buildBoolean(filter:Filter){
        if(filter.Value==null){
            return ''
        }else if(filter.Value){
            return `${filter.FieldName}=true`
        }else if(!filter.Value){
            return `${filter.FieldName}=false`
        }else{
            return ''
        }
    }
    private buildString(filter:Filter){
        if(!filter.Value){
            return ''
        }
        let compare=this.caseCompare(filter.CompareType);
        return `${filter.FieldName}${compare}("${filter.Value}")`
    }
    private buildNumber(filter:Filter){
        let compare=this.caseCompare(filter.CompareType);
        return `${filter.FieldName}${compare}${filter.Value}`
    }
    private caseCompare(compareType:CompareType){
        switch(compareType){
            case CompareType.Greater:return '>';
            case CompareType.Less:return '<';
            case CompareType.Equal:return '=';
            case CompareType.GreaterOrEqual:return '>=';
            case CompareType.LessOrEqual:return '<=';
            case CompareType.Contains:return '.Contains';
            case CompareType.StartWith:return '.StartWith';
            case CompareType.EndWith:return '.EndWith';
            case CompareType.NotEqual:return '!=';
        }
    }
    title(title:string){
        let appname=this.abp.localization.localize('AppName',appconst.localization.defaultLocalizationSourceName);
        let page=this.abp.localization.localize(title,appconst.localization.defaultLocalizationSourceName);
        window.document.title = appname+'--'+page;
    }
    inOf(arr:Array<any>, targetArr:any) {
        let res = true;
        arr.forEach(item => {
            if (targetArr.indexOf(item) < 0) {
                res = false;
            }
        });
        return res;
    }
    oneOf(ele:any, targetArr:Array<any>) {
        if (targetArr.indexOf(ele) >= 0) {
            return true;
        } else {
            return false;
        }
    }
    showThisRoute (itAccess:any, currentAccess:any) {
        if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
            return this.oneOf(currentAccess, itAccess);
        } else {
            return itAccess === currentAccess;
        }
    }
    getRouterObjByName (routers:Array<any>, name?:string):any {
        if (!name || !routers || !routers.length) {
            return null;
        }
        // debugger;
        let routerObj = null;
        for (let item of routers) {
            if (item.name === name) {
                return item;
            }
            routerObj = this.getRouterObjByName(item.children, name);
            if (routerObj) {
                return routerObj;
            }
        }
        return null;
    }
    toDefaultPage (routers:Array<any>, name:string|undefined, route:any, next:any) {
        let len = routers.length;
        let i = 0;
        let notHandle = true;
        while (i < len) {
            if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
                route.replace({
                    name: routers[i].children[0].name
                });
                notHandle = false;
                next();
                break;
            }
            i++;
        }
        if (notHandle) {
            next();
        }
    }
    handleTitle (vm:any, item:any) {
        if (typeof item.meta.title === 'object') {
            return vm.$t(item.title.i18n);
        } else {
            return item.meta.title;
        }
    }
    setCurrentPath  (vm:Vue, name?:string) {
        let title = '';
        let isOtherRouter = false;
        vm.$store.state.app.routers.forEach((item:any) => {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    title = this.handleTitle(vm, item);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            } else {
                item.children.forEach((child:any) => {
                    if (child.name === name) {
                        title = this.handleTitle(vm, child);
                        if (item.name === 'otherRouter') {
                            isOtherRouter = true;
                        }
                    }
                });
            }
        });
        let currentPathArr = [];
        if (name === 'home') {
            currentPathArr = [
                {
                    meta:{title: this.handleTitle(vm, this.getRouterObjByName(vm.$store.state.app.routers, 'home'))},
                    path: 'main/home',
                    name: 'home'
                }
            ];
        } else if (((name as string).indexOf('index') >= 0 || isOtherRouter) && name !== 'home') {
            currentPathArr = [
                {
                    meta:{title: this.handleTitle(vm, this.getRouterObjByName(vm.$store.state.app.routers, 'home'))},
                    path: 'main/home',
                    name: 'home'
                },
                {
                    meta:{title: title},
                    path: '',
                    name: name
                }
            ];
        } else {
            let currentPathObj = vm.$store.state.app.routers.filter((item:any) => {
                if (item.children.length <= 1) {
                    return item.children[0].name === name||item.name===name;
                } else {
                    let i = 0;
                    let childArr = item.children;
                    let len = childArr.length;
                    while (i < len) {
                        if (childArr[i].name === name) {
                            return true;
                        }
                        i++;
                    }
                    return false;
                }
            })[0];
            if (currentPathObj.children&&currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
                currentPathArr = [
                    {
                        meta:{title: 'HomePage'},
                        path: 'main/home',
                        name: 'home'
                    }
                ];
            } else if (currentPathObj.children&&currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
                currentPathArr = [
                    {
                        meta:{title: 'HomePage'},
                        path: 'main/home',
                        name: 'home'
                    },
                    {
                        meta:{title: currentPathObj.meta.title},
                        path: '',
                        name: name
                    }
                ];
            } else {
                let childObj = currentPathObj.children.filter((child:any) => {
                    return child.name === name;
                })[0];
                currentPathArr = [
                    {
                        meta:{title: 'HomePage'},
                        path: 'main/home',
                        name: 'home'
                    },
                    {
                        meta:{title: currentPathObj.meta.title},
                        path: '',
                        name: ''
                    },
                    {
                        meta:{title: childObj.meta.title},
                        path: currentPathObj.path + '/' + childObj.path,
                        name: name
                    }
                ];
            }
        }
        vm.$store.commit('app/setCurrentPath', currentPathArr);
    
        return currentPathArr;
    }
    openNewPage (vm:Vue, name:string|undefined, argu?:any, query?:any) {
        let pageOpenedList = vm.$store.state.app.pageOpenedList;
        let openedPageLen = pageOpenedList.length;
        let i = 0;
        let tagHasOpened = false;
        while (i < openedPageLen) {
            if (name === pageOpenedList[i].name) { // 页面已经打开
                vm.$store.commit('app/pageOpenedList', {
                    index: i,
                    argu: argu,
                    query: query
                });
                tagHasOpened = true;
                break;
            }
            i++;
        }
        if (!tagHasOpened) {
            let tag = vm.$store.state.app.tagsList.filter((item:any) => {
                if (item.children) {
                    return name === item.children[0].name;
                } else {
                    return name === item.name;
                }
            });
            tag = tag[0];
            if (tag) {
                tag = tag.children ? tag.children[0] : tag;
                if (argu) {
                    tag.argu = argu;
                }
                if (query) {
                    tag.query = query;
                }
                vm.$store.commit('app/increateTag', tag);
            }
        }
        vm.$store.commit('app/setCurrentPageName', name);
    }
    fullscreenEvent (vm:Vue) {
        vm.$store.commit('app/initCachepage');
        // 权限菜单过滤相关
        vm.$store.commit('app/updateMenulist');
        // 全屏相关
    }
    extend(...args:any[]) {
        let options, name, src, srcType, copy, copyType, copyIsArray, clone,
        target = args[0] || {},
        i = 1,
        length = args.length,
        deep = false;
        if ( typeof target === 'boolean') {
            deep = target;
            target = args[i] || {};
            i++;
        }
        if ( typeof target !== 'object' && typeof target !== 'function') {
            target = {};
        }
        if ( i === length) {
            target = this;
            i--;
        }
        for ( ; i < length; i++ ) {
            if ( (options = args[i]) !== null ) {
                for ( name in options ) {
                    src = target[name];
                    copy = options[name];
                    if ( target === copy ) {
                        continue;
                    }
                    srcType = Array.isArray(src) ? 'array': typeof src;
                    if ( deep && copy && ((copyIsArray = Array.isArray(copy)) || typeof copy === 'object')) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && srcType === 'array' ? src : [];
                        } else {
                            clone = src && srcType === 'object' ? src: {};
                        }
                        target[name] = this.extend(deep, clone, copy);
                    } else if ( copy !== undefined ) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }
}
const util=new Util();
export default util;