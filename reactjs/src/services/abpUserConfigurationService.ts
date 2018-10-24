import http from "../lib/httpService";
import { injectable } from "inversify";

export interface IAbpUserConfigurationService {
  initialize(): void;
}
declare var jQuery: any;
declare var abp: any;

@injectable()
export class AbpUserConfigurationService
  implements IAbpUserConfigurationService {
  async initialize() {
    await http.get("/AbpUserConfiguration/GetAll").then(result => {
      jQuery.extend(true, abp, JSON.parse(JSON.stringify(result)));
    });
  }
}
