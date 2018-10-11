class AbpMultiTenancyService {
  get isEnabled(): boolean {
    return abp.multiTenancy.isEnabled;
  }
}

export default AbpMultiTenancyService;
//newing class is making an Immediately Invoked Function Expression,
//so I can achieve Angular's Dependency Injection.
