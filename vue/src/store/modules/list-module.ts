import {Store,Module,ActionContext, MutationTree} from 'vuex'
import ListState from './list-state'

export default class ListModule<T extends ListState<U>,R,U> implements Module<ListState<U>,R>{
    namespaced=true;
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list:new Array<U>(),
        loading:false
    };
    mutations={
        setCurrentPage(state:ListState<U>,page:number){
            state.currentPage=page;
        },
        setPageSize(state:ListState<U>,pagesize:number){
            state.pageSize=pagesize;
        }
    }
}