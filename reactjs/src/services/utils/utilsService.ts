import { injectable } from "inversify";

export interface IUtilsService {
  getCookieValue(key: string): string;
  setCookieValue(
    key: string,
    value: string,
    expireDate?: Date,
    path?: string
  ): void;
  deleteCookie(key: string, path?: string): void;
}

@injectable()
export class UtilsService implements IUtilsService {
  getCookieValue(key: string): string {
    return abp.utils.getCookieValue(key);
  }

  setCookieValue(
    key: string,
    value: string,
    expireDate?: Date,
    path?: string
  ): void {
    abp.utils.setCookieValue(key, value, expireDate, path);
  }

  deleteCookie(key: string, path?: string): void {
    abp.utils.deleteCookie(key, path);
  }
}
