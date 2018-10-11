class SettingService {
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

export default SettingService;
//newing class is making an Immediately Invoked Function Expression,
//so I can achieve Angular's Dependency Injection.
