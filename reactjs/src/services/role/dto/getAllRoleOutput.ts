export interface GetAllRoleOutput {
  name: string;
  displayName: string;
  normalizedName: string;
  description: string;
  grantedPermissions: string[];
  id: number;
}
