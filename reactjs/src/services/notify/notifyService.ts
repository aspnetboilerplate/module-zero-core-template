import { injectable } from "inversify";

export interface INotifyService {
  info(message: string, title?: string, options?: any): void;
  success(message: string, title?: string, options?: any): void;
  warn(message: string, title?: string, options?: any): void;
  error(message: string, title?: string, options?: any): void;
}

@injectable()
export class NotifyService implements INotifyService {
  info(message: string, title?: string, options?: any): void {
    abp.notify.info(message, title, options);
  }

  success(message: string, title?: string, options?: any): void {
    abp.notify.success(message, title, options);
  }

  warn(message: string, title?: string, options?: any): void {
    abp.notify.warn(message, title, options);
  }

  error(message: string, title?: string, options?: any): void {
    abp.notify.error(message, title, options);
  }
}
