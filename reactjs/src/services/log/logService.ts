import { injectable } from "inversify";

export interface ILogService {
  debug(logObject?: any): void;
  info(logObject?: any): void;
  warn(logObject?: any): void;
  error(logObject?: any): void;
  fatal(logObject?: any): void;
}

@injectable()
export class LogService implements ILogService {
  debug(logObject?: any): void {
    abp.log.debug(logObject);
  }

  info(logObject?: any): void {
    abp.log.info(logObject);
  }

  warn(logObject?: any): void {
    abp.log.warn(logObject);
  }

  error(logObject?: any): void {
    abp.log.error(logObject);
  }

  fatal(logObject?: any): void {
    abp.log.fatal(logObject);
  }
}
