import { injectable } from "inversify";
import {
  UserLoginInfoDto,
  TenantLoginInfoDto,
  ApplicationInfoDto,
  SessionServiceProxy,
  GetCurrentLoginInformationsOutput
} from "../serviceProxies/serviceProxies";
import { IAbpMultiTenancyService } from "../multiTenancy/abpMultiTenancyService";

export interface IAppSessionService {
  application: ApplicationInfoDto | undefined;
  user: UserLoginInfoDto | undefined;
  userId: number | null | undefined;
  tenant: TenantLoginInfoDto | undefined;
  tenantId: number | null | undefined;
  getShownLoginName(): string | undefined;
  init(): Promise<boolean>;
  changeTenantIfNeeded(tenantId?: number): boolean;
}

@injectable()
export class AppSessionService implements IAppSessionService {
  private _user: UserLoginInfoDto | undefined;
  private _tenant: TenantLoginInfoDto | undefined;
  private _application: ApplicationInfoDto | undefined;

  constructor(
    private _sessionService: SessionServiceProxy,
    private _abpMultiTenancyService: IAbpMultiTenancyService
  ) {}

  get application(): ApplicationInfoDto | undefined {
    return this._application;
  }

  get user(): UserLoginInfoDto | undefined {
    return this._user;
  }

  get userId(): number | null | undefined {
    return this.user ? this.user.id : null;
  }

  get tenant(): TenantLoginInfoDto | undefined {
    return this._tenant;
  }

  get tenantId(): number | null | undefined {
    return this.tenant ? this.tenant.id : null;
  }

  getShownLoginName(): string | undefined {
    let userName = this._user.userName;
    if (!this._abpMultiTenancyService.isEnabled) {
      return userName;
    }

    return (this._tenant ? this._tenant.tenancyName : ".") + "\\" + userName;
  }

  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._sessionService
        .getCurrentLoginInformations()
        .toPromise()
        .then(
          (result: GetCurrentLoginInformationsOutput) => {
            this._application = result.application;
            this._user = result.user;
            this._tenant = result.tenant;

            resolve(true);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  changeTenantIfNeeded(tenantId?: number): boolean {
    if (this.isCurrentTenant(tenantId)) {
      return false;
    }

    abp.multiTenancy.setTenantIdCookie(tenantId);
    location.reload();
    return true;
  }

  private isCurrentTenant(tenantId?: number) {
    if (!tenantId && this.tenant) {
      return false;
    } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
      return false;
    }

    return true;
  }
}
