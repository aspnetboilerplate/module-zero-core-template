import { injectable } from "inversify";

export interface ISettingService {
  get(name: string): string;
  getBoolean(name: string): boolean;
  getInt(name: string): number;
}

@injectable()
export class SettingService implements ISettingService {
  get(name: string): string {
    return abp.setting.get(name);
  }

  getBoolean(name: string): boolean {
    return abp.setting.getBoolean(name);
  }

  getInt(name: string): number {
    return abp.setting.getInt(name);
  }
}
