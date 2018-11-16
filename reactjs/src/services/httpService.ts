import axios from 'axios';
import AppConsts from './../lib/appconst';

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IjExZjc0NjVkLTc1MmUtNGY0MS1jNzBkLTM5ZWExMTdiYTY0YyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6ImRiM2E0Y2QwLTYxMDUtNDU2My05NmNiLTU4NDdkMzRlOWVjNiIsImlhdCI6MTU0MjM5MTYxNCwibmJmIjoxNTQyMzkxNjE0LCJleHAiOjE1NDI0NzgwMTQsImlzcyI6IkFicFByb2plY3ROYW1lIiwiYXVkIjoiQWJwUHJvamVjdE5hbWUifQ.knVps4nErOzEYscjofdQit0u1TGS38oqxtCU_8Dl5Hc',
  },
});

http.interceptors.request.use(
  function(config) {
    if (!!abp.auth.getToken()) {
      config.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IjExZjc0NjVkLTc1MmUtNGY0MS1jNzBkLTM5ZWExMTdiYTY0YyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6ImRiM2E0Y2QwLTYxMDUtNDU2My05NmNiLTU4NDdkMzRlOWVjNiIsImlhdCI6MTU0MjM5MTYxNCwibmJmIjoxNTQyMzkxNjE0LCJleHAiOjE1NDI0NzgwMTQsImlzcyI6IkFicFByb2plY3ROYW1lIiwiYXVkIjoiQWJwUHJvamVjdE5hbWUifQ.knVps4nErOzEYscjofdQit0u1TGS38oqxtCU_8Dl5Hc';
    }

    config.headers.common['.AspNetCore.Culture'] = abp.utils.getCookieValue('Abp.Localization.CultureName');
    config.headers.common['Abp.TenantId'] = abp.multiTenancy.getTenantIdCookie();

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
    if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
      // TODO: Below code will be modified when react-toastify is added
      // vm.$Modal.error({
      //   title: error.response.data.error.message,
      //   content: error.response.data.error.details
      // });

      console.log(`title:${error.response.data.error.message} content:$`);
    } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
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
