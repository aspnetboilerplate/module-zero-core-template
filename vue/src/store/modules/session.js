import util from '@/libs/util';
const session={
    namespaced: true,
    state:{
        application:null,
        user:null,
        tenant:null
    },
    actions:{
        async init({state}){
            let rep=await util.ajax.get('/api/services/app/Session/GetCurrentLoginInformations',{
                headers:{
                    'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
                }});
            state.application=rep.data.result.application;
            state.user=rep.data.result.user;
            state.tenant=rep.data.result.tenant;
        }
    }
}
export default session;