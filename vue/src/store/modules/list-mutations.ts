import ListState from './list-state'

export default class ListMutations<U>{
    setCurrentPage(state:ListState<U>,page:number){
        state.currentPage=page;
    }
    setPageSize(state:ListState<U>,pagesize:number){
        state.pageSize=pagesize;
    }
}