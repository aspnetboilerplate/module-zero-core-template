import Cookies from 'js-cookie';
import Util from '@/libs/util'
import appconst from '@/libs/appconst'
const user = {
    namespaced:true,
    state: {
        roles:[],
        totalCount:0,
        pageSize:10,
        currentPage:1,
        permissions:[]
    },
    mutations: {
        setPageSize(state,size){
            state.pageSize=size;
        },
        setCurrentPage(state,page){
            state.currentPage=page;
        }
    },
    actions:{
        async getAll({state},payload){
            let page={
                maxResultCount:state.pageSize,
                skipCount:(state.currentPage-1)*state.pageSize
            }
            let rep= await Util.ajax.get('/api/services/app/Role/GetAll',{params:page});
            state.roles=[];
            state.roles.push(...rep.data.result.items);
            state.totalCount=rep.data.result.totalCount;
        },
        async delete({state},payload){
            await Util.ajax.delete('/api/services/app/Role/Delete?Id='+payload.data.id);
        },
        async create({state},payload){
            await Util.ajax.post('/api/services/app/Role/Create',payload.data);
        },
        async update({state},payload){
            await Util.ajax.put('/api/services/app/Role/Update',payload.data);
        },
        async getAllPermissions({state}){
            let rep=await Util.ajax.get('/api/services/app/Role/GetAllPermissions');
            state.permissions=[];
            state.permissions.push(...rep.data.result.items)
        }
    }
};

export default user;
