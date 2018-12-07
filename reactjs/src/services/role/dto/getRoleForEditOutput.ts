export interface Role {
  name: string;
  displayName: string;
  description?: any;
  isStatic: boolean;
  id: number;
}

export interface Permission {
  name: string;
  displayName: string;
  description?: any;
}

export interface GetRoleForEditOutput {
  role: Role;
  permissions: Permission[];
  grantedPermissionNames: string[];
}
