import axios from "axios";
import appconst from "./appconst";
const http = axios.create({
  baseURL: appconst.remoteServiceBaseUrl,
  timeout: 30000
});
http.interceptors.request.use(
  function(config) {
    if (!!abp.auth.getToken()) {
      config.headers.common["Authorization"] = "Bearer " + abp.auth.getToken();
    }
    config.headers.common[".AspNetCore.Culture"] = abp.utils.getCookieValue(
      "Abp.Localization.CultureName"
    );
    config.headers.common[
      "Abp.TenantId"
    ] = abp.multiTenancy.getTenantIdCookie();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
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
    } else if (!error.response) {
      // TODO: Below code will be modified when react-toastify is added
      // vm.$Modal.error(window.abp.localization.localize("UnknownError"));
    }
    setTimeout(() => {
      // TODO: Below code will be modified when react-toastify is added
      // vm.$Message.destroy();
    }, 1000);
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
