import { CreateRoleInput } from './dto/createRoleInput';
import { CreateRoleOutput } from './dto/createRoleOutput';
import GetRoleAsyncOutput from './dto/getRoleAsyncOutput';
import { UpdateRoleInput } from './dto/updateRoleInput';
import { UpdateRoleOutput } from './dto/updateRoleOutput';
import { EntityDto } from '../../model/entityDto';
import api from '../apiServiceBase';

class RoleService {
  public async create(
    createRoleInput: CreateRoleInput,
  ): Promise<CreateRoleOutput> {
    var result = await http.post('services/app/Role/Create', createRoleInput);
    console.log(result);
    return result;
  }
  public async getRolesAsync(
    getRoleAsyncInput: GetRoleAsyncInput,
  ): Promise<GetRoleAsyncOutput> {
    var result = await http.get(
      'services/app/Role/GetRolesAsync',
      getRoleAsyncInput,
    );
    console.log(result);
    return result;
  }
  public async update(
    updateRoleInput: UpdateRoleInput,
  ): Promise<UpdateRoleOutput> {
    var result = await http.put('services/app/Role/Update', updateRoleInput);
    console.log(result);
    return result;
  }
  public async Delete(entityDto: EntityDto) {
    var result = await http.delete('services/app/Role/Delete', entityDto);
    console.log(result);
    return result;
  }
  public async getAllPermissions() {
    var result = await http.get('services/app/Role/GetAllPermissions');
    console.log(result);
    return result;
  }
  public async getRoleForEdit(entityDto: EntityDto) {
    var result = await http.get('services/app/Role/GetRoleForEdit', entityDto);
    console.log(result);
    return result;
  }
  public async get(entityDto: EntityDto) {
    var result = await http.get('services/app/Role/Get', entityDto);
    console.log(result);
    return result;
  }
  public async getAll(
    pagedFilterAndSortedRequest: PagedFilterAndSortedRequest,
  ) {
    var result = await http.get(
      'services/app/Role/GetAll',
      pagedFilterAndSortedRequest,
    );
    console.log(result);
    return result;
  }
}

export default new RoleService();
