
export default interface ListActions<T>{
    getAll(state:T,payload:any):any;
    create(state:T,payload:any):any;
    update(state:T,payload:any):any;
    delete(state:T,payload:any):any;
    get(state:T,payload:any):any;
}