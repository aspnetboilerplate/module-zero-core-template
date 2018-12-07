import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Role from '../entities/role'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';

interface RoleState extends ListState<Role>{
    editRole:Role;
    permissions:Array<string>
}
class RoleModule extends ListModule<RoleState,any,Role>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Role>(),
        loading:false,
        editRole:new Role(),
        permissions:new Array<string>()
    }
    actions={
        async getAll(context:ActionContext<RoleState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/Role/GetAll',{params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Role>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<RoleState,any>,payload:any){
            await Ajax.post('/api/services/app/Role/Create',payload.data);
        },
        async update(context:ActionContext<RoleState,any>,payload:any){
            await Ajax.put('/api/services/app/Role/Update',payload.data);
        },
        async delete(context:ActionContext<RoleState,any>,payload:any){
            await Ajax.delete('/api/services/app/Role/Delete?Id='+payload.data.id);
        },
        async get(context:ActionContext<RoleState,any>,payload:any){
            let reponse=await Ajax.get('/api/services/app/Role/Get?Id='+payload.id);
            return reponse.data.result as Role;
        },
        async getAllPermissions(context:ActionContext<RoleState,any>){
            let reponse=await Ajax.get('/api/services/app/Role/getAllPermissions');
            context.state.permissions=reponse.data.result.items;
        }
    };
    mutations={
        setCurrentPage(state:RoleState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:RoleState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:RoleState,role:Role){
            state.editRole=role;
        }
    }
}
const roleModule=new RoleModule();
export default roleModule;