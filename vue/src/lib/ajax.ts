import axios from 'axios'
import appconst from './appconst'
import Vue from 'vue'
const ajax = axios.create({
    baseURL: appconst.remoteServiceBaseUrl,
    timeout: 30000
});
ajax.interceptors.request.use(function (config) {
    if(!!window.abp.auth.getToken()){
        config.headers.common["Authorization"]="Bearer "+window.abp.auth.getToken();
    }
    config.headers.common[".AspNetCore.Culture"]=window.abp.utils.getCookieValue("Abp.Localization.CultureName");
    config.headers.common["Abp.TenantId"]=window.abp.multiTenancy.getTenantIdCookie();
    return config;
  }, function (error) {
    
    return Promise.reject(error);
});
let vm=new Vue({});
ajax.interceptors.response.use((respon)=>{    
    return respon
},(error)=>{
    if(!!error.response&&!!error.response.data.error&&!!error.response.data.error.message&&error.response.data.error.details){
        vm.$Modal.error({title:error.response.data.error.message,content:error.response.data.error.details})
    }else if(!!error.response&&!!error.response.data.error&&!!error.response.data.error.message){
        vm.$Modal.error({title:window.abp.localization.localize("LoginFailed"),content:error.response.data.error.message})
    }else if(!error.response){
        vm.$Modal.error(window.abp.localization.localize('UnknownError'));
    }
    setTimeout(()=>{
       vm.$Message.destroy();
    },1000);
    return Promise.reject(error);
})
export default ajax;