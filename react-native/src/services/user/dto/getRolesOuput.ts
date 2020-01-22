export interface GetRoles {
  name: string;
  displayName: string;
  normalizedName: string;
  description: string;
  grantedPermissions: string[];
  id: number;
}
