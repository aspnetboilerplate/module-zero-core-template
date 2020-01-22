export interface Role {
  name: string;
  displayName: string;
  description?: any;
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
