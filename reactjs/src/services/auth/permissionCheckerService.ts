import { injectable } from "inversify";

export interface IPermissionCheckerService {
  isGranted(permissionName: string): boolean;
}

@injectable()
export class PermissionCheckerService implements IPermissionCheckerService {
  isGranted(permissionName: string): boolean {
    return abp.auth.isGranted(permissionName);
  }
}
