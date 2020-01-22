import RoleModel from './roleModel';
import PermissionModel from './permissionModel';

class RoleEditModel {
  role: RoleModel = new RoleModel();
  permissions: PermissionModel[] = [];
  grantedPermissionNames: string[] = [];
}

export default RoleEditModel;
