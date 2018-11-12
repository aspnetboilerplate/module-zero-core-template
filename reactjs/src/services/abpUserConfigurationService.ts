import http from './httpService';
// import { apiUrl } from "../config.json";

// const apiEndPoint = apiUrl + "/movies";
export async function initialize() {
  const result = await http.get('/AbpUserConfiguration/GetAll');
  return result.data;
}
