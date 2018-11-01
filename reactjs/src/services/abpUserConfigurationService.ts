import http from "./httpService";
// import { apiUrl } from "../config.json";

// const apiEndPoint = apiUrl + "/movies";
export async function initialize() {
  return await http.get("/AbpUserConfiguration/GetAll");
}
