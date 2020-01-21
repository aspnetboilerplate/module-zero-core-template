export interface UpdateRoleInput {
  name: string;
  displayName: string;
  normalizedName: string;
  description: string;
  grantedPermissions: string[];
  id: number;
}
