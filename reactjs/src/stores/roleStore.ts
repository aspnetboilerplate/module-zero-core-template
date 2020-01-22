import { action, observable } from 'mobx';

import { CreateRoleInput } from '../services/role/dto/createRoleInput';
import { EntityDto } from '../services/dto/entityDto';
import { GetAllPermissionsOutput } from '../services/role/dto/getAllPermissionsOutput';
import { GetAllRoleOutput } from '../services/role/dto/getAllRoleOutput';
import { GetRoleAsyncInput } from '../services/role/dto/getRolesAsyncInput';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedRoleResultRequestDto } from '../services/role/dto/PagedRoleResultRequestDto';
import RoleEditModel from '../models/Roles/roleEditModel';
import { UpdateRoleInput } from '../services/role/dto/updateRoleInput';
import roleService from '../services/role/roleService';

class RoleStore {
  @observable roles!: PagedResultDto<GetAllRoleOutput>;
  @observable roleEdit: RoleEditModel = new RoleEditModel();
  @observable allPermissions: GetAllPermissionsOutput[] = [];

  @action
  async create(createRoleInput: CreateRoleInput) {
    await roleService.create(createRoleInput);
  }

  @action
  async createRole() {
    this.roleEdit = {
      grantedPermissionNames: [],
      role: {
        name: '',
        displayName: '',
        description: '',
        id: 0,
      },
      permissions: [{ name: '', displayName: '', description: '' }],
    };
  }

  @action
  async getRolesAsync(getRoleAsyncInput: GetRoleAsyncInput) {
    await roleService.getRolesAsync(getRoleAsyncInput);
  }

  @action
  async update(updateRoleInput: UpdateRoleInput) {
    await roleService.update(updateRoleInput);
    this.roles.items
      .filter((x: GetAllRoleOutput) => x.id === updateRoleInput.id)
      .map((x: GetAllRoleOutput) => {
        return (x = updateRoleInput);
      });
  }

  @action
  async delete(entityDto: EntityDto) {
    await roleService.delete(entityDto);
    this.roles.items = this.roles.items.filter((x: GetAllRoleOutput) => x.id !== entityDto.id);
  }

  @action
  async getAllPermissions() {
    var result = await roleService.getAllPermissions();
    this.allPermissions = result;
  }

  @action
  async getRoleForEdit(entityDto: EntityDto) {
    let result = await roleService.getRoleForEdit(entityDto);
    this.roleEdit.grantedPermissionNames = result.grantedPermissionNames;
    this.roleEdit.permissions = result.permissions;
    this.roleEdit.role = result.role;
  }

  @action
  async get(entityDto: EntityDto) {
    var result = await roleService.get(entityDto);
    this.roles = result.data.result;
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedRoleResultRequestDto) {
    let result = await roleService.getAll(pagedFilterAndSortedRequest);
    this.roles = result;
  }
}

export default RoleStore;
