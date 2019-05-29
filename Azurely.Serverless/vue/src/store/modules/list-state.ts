export default interface ListState<T>{
    totalCount:number;
    currentPage:number;
    pageSize:number;
    list:Array<T>;
    loading:boolean;
}