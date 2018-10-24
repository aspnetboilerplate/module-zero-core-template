import { injectable } from "inversify";

export interface IAbpMultiTenancyService {
  isEnabled(): boolean;
}

@injectable()
export class AbpMultiTenancyService implements IAbpMultiTenancyService {
  isEnabled(): boolean {
    return abp.multiTenancy.isEnabled;
  }
}
