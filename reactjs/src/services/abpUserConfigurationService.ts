import http from './httpService';

export async function initialize() {
  const result = await http.get('/AbpUserConfiguration/GetAll');
  return result;
}
