import util from '@/libs/util';
const session={
    namespaced: true,
    state:{
        
    },
    actions:{
        async isTenantAvailable({state},payload){
            let rep=await util.ajax.post('/api/services/app/Account/IsTenantAvailable',payload.data);
            return rep.data.result;
        }
    }
}
export default session;