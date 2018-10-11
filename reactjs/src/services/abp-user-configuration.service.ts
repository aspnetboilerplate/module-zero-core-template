import http from "./../lib/httpService";

declare var jQuery: any;
declare var abp: any;

export class AbpUserConfigurationService {
  async initialize() {
    await http.get("/AbpUserConfiguration/GetAll").then(result => {
      jQuery.extend(true, abp, JSON.parse(JSON.stringify(result)));
    });
  }
}
