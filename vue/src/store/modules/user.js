import Cookies from 'js-cookie';
import Util from '@/libs/util'
import appconst from '@/libs/appconst'
const user = {
    namespaced:true,
    state: {
        users:[],
        totalCount:0,
        pageSize:10,
        currentPage:1,
        roles:[]
    },
    mutations: {
        logout(){
            abp.auth.clearToken();
            location.reload();
        },
        setPageSize(state,size){
            state.pageSize=size;
        },
        setCurrentPage(state,page){
            state.currentPage=page;
        }
    },
    actions:{
        async login({state},payload){
            let rep=await Util.ajax.post("/api/TokenAuth/Authenticate",payload.data);
            var tokenExpireDate = payload.data.rememberMe ? (new Date(new Date().getTime() + 1000 * rep.data.result.expireInSeconds)) : undefined;
            abp.auth.setToken(rep.data.result.accessToken,tokenExpireDate);
            abp.utils.setCookieValue(appconst.authorization.encrptedAuthTokenName,rep.data.result.encryptedAccessToken,tokenExpireDate,abp.appPath)
        },
        async getAll({state},payload){
            let page={
                maxResultCount:state.pageSize,
                skipCount:(state.currentPage-1)*state.pageSize
            }
            let rep= await Util.ajax.get('/api/services/app/User/GetAll',{params:page});
            state.users=[];
            state.users.push(...rep.data.result.items);
            state.totalCount=rep.data.result.totalCount;
        },
        async delete({state},payload){
            await Util.ajax.delete('/api/services/app/User/Delete?Id='+payload.data.id);
        },
        async create({state},payload){
            await Util.ajax.post('/api/services/app/User/Create',payload.data);
        },
        async update({state},payload){
            await Util.ajax.put('/api/services/app/User/Update',payload.data);
        },
        async getRoles({state}){
            let rep=await Util.ajax.get('/api/services/app/User/GetRoles');
            state.roles=[];
            state.roles.push(...rep.data.result.items)
        },
        async changeLanguage({state},payload){
            let rep=await Util.ajax.post('/api/services/app/User/ChangeLanguage',payload.data);
            abp.utils.setCookieValue(
                'Abp.Localization.CultureName',
                payload.data.languageName,
                new Date(new Date().getTime() + 5 * 365 * 86400000),
                abp.appPath
            );  
            window.location.reload();
        }
    }
};

export default user;
