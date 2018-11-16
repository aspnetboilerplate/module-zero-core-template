export interface GetRolesItem {
  name: string;
  displayName: string;
  normalizedName: string;
  description: string;
  isStatic: boolean;
  permissions: string[];
  id: number;
}

export interface GetRoles {
  items: GetRolesItem[];
}
