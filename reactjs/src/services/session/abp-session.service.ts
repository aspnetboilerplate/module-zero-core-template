class AbpSessionService {
  get userId(): number | undefined {
    return abp.session.userId;
  }

  get tenantId(): number | undefined {
    return abp.session.tenantId;
  }

  get impersonatorUserId(): number | undefined {
    return abp.session.impersonatorUserId;
  }

  get impersonatorTenantId(): number | undefined {
    return abp.session.impersonatorTenantId;
  }

  get multiTenancySide(): abp.multiTenancy.sides {
    return abp.session.multiTenancySide;
  }
}
export default AbpSessionService;
//newing class is making an Immediately Invoked Function Expression,
//so I can achieve Angular's Dependency Injection.
