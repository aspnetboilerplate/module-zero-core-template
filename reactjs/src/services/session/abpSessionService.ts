import { injectable } from "inversify";

export interface IAbpSessionService {
  userId(): number | undefined;
  tenantId(): number | undefined;
  impersonatorUserId(): number | undefined;
  impersonatorTenantId(): number | undefined;
  multiTenancySide(): abp.multiTenancy.sides;
}

@injectable()
export class AbpSessionService implements IAbpSessionService {
  userId(): number | undefined {
    return abp.session.userId;
  }

  tenantId(): number | undefined {
    return abp.session.tenantId;
  }

  impersonatorUserId(): number | undefined {
    return abp.session.impersonatorUserId;
  }

  impersonatorTenantId(): number | undefined {
    return abp.session.impersonatorTenantId;
  }

  multiTenancySide(): abp.multiTenancy.sides {
    return abp.session.multiTenancySide;
  }
}
