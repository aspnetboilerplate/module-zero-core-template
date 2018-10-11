class PermissionCheckerService {
  isGranted(permissionName: string): boolean {
    return abp.auth.isGranted(permissionName);
  }
}

export default new PermissionCheckerService();
//newing class is making an Immediately Invoked Function Expression,
//so I can achieve Angular's Dependency Injection.
