import { observable, action } from 'mobx';
import roleService from 'src/services/role/roleService';
import { GetAllRoleOutput } from 'src/services/role/dto/getAllRoleOutput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import { EntityDto } from 'src/services/dto/entityDto';
import { CreateRoleInput } from 'src/services/role/dto/createRoleInput';
import { GetRoleForEditOutput } from 'src/services/role/dto/getRoleForEditOutput';
import { UpdateRoleInput } from 'src/services/role/dto/updateRoleInput';
import { GetAllPermissionsOutput } from 'src/services/role/dto/getAllPermissionsOutput';

class RoleStores {
  
  @observable
  roles: PagedResultDto<GetAllRoleOutput>;
  @observable
  roleForEdit:GetRoleForEditOutput;
  @observable
  allPermissions: GetAllPermissionsOutput

  @action async create(createRoleInput:CreateRoleInput){
var result=await roleService.create(createRoleInput);
console.log(result);
  }

  @action async getRolesAsync(getRoleAsyncInput: GetRoleAsyncInput) {
    var result = await roleService.getRolesAsync(getRoleAsyncInput);
    console.log(result);
  }

  @action async update(updateRoleInput: UpdateRoleInput) {
    var result = await roleService.update(updateRoleInput);
    console.log(result);
    this.roles.items.filter((x: GetAllRoleOutput) => x.id == updateRoleInput.id).map((x: GetAllRoleOutput) => {
      return x = updateRoleInput;

    })
  }
 
  @action async delete(entityDto: EntityDto) {
    // var result = await roleService.delete(entityDto);
    // console.log(result);
    this.roles.items=this.roles.items.filter((x: GetAllRoleOutput) => x.id != entityDto.id);
  }

  @action async getAllPermissions() {
    var result = await roleService.getAllPermissions();
    console.log(result);
    this.allPermissions=result;
  }

  @action async getRoleForEdit(entityDto:EntityDto){
var result=await roleService.getRoleForEdit(entityDto);
this.roleForEdit=result;
  }

  @action async get(entityDto:EntityDto) {
    var result = await roleService.get(entityDto);
    console.log(result);
    ;
    this.roles=result.data.result;
    
  }

  @action async getAll(pagedFilterAndSortedRequest:PagedFilterAndSortedRequest){
    
    ;
    var result = await roleService.getAll(pagedFilterAndSortedRequest);
    console.log(result);
    this.roles=result;
   
  }
}

export default new RoleStores();
