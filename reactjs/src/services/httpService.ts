import axios from "axios";
import AppConsts from "./../lib/appconst";

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000
});

// http.interceptors.request.use(
//   function (config) {
//     // if (!!abp.auth.getToken()) {
//     //   config.headers.common["Authorization"] = "Bearer " + abp.auth.getToken();
//     // }
//     // config.headers.common[".AspNetCore.Culture"] = abp.utils.getCookieValue(
//     //   "Abp.Localization.CultureName"
//     // );
//     // config.headers.common[
//     //   "Abp.TenantId"
//     // ] = abp.multiTenancy.getTenantIdCookie();
//     // return config;
//     return null;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
// TODO: Below code will be modified when react-toastify is added
// let vm = new Vue({});
http.interceptors.response.use(
  respon => {
    return respon;
  },
  error => {
    if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message &&
      error.response.data.error.details
    ) {
      // TODO: Below code will be modified when react-toastify is added
      // vm.$Modal.error({
      //   title: error.response.data.error.message,
      //   content: error.response.data.error.details
      // });

      console.log(`title:${error.response.data.error.message} content:$`);
    } else if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message
    ) {
      // TODO: Below code will be modified when react-toastify is added
      // vm.$Modal.error({
      //   title: window.abp.localization.localize("LoginFailed"),
      //   content: error.response.data.error.message
      // });
      console.log(`title: Login Failed content:$`);
    } else if (!error.response) {
      // TODO: Below code will be modified when react-toastify is added
      // vm.$Modal.error(window.abp.localization.localize("UnknownError"));
      console.log(`title:unkknown error content:$`);
    }
    setTimeout(() => {
      // TODO: Below code will be modified when react-toastify is added
      // vm.$Message.destroy();
    }, 1000);
    return Promise.reject(error);
  }
);

export default http;
