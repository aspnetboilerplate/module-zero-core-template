import { CreateRoleInput } from './dto/createRoleInput';
import { CreateRoleOutput } from './dto/createRoleOutput';
import GetRoleAsyncOutput from './dto/getRoleAsyncOutput';
import { UpdateRoleInput } from './dto/updateRoleInput';
import { UpdateRoleOutput } from './dto/updateRoleOutput';
import { EntityDto } from '../dto/entityDto';
import http from '../httpService';

class RoleService {
  public async create(createRoleInput: CreateRoleInput): Promise<CreateRoleOutput> {
    var result = await http.post('services/app/Role/Create', createRoleInput);
    console.log(result);
    return result.data.result as CreateRoleOutput;
  }

  public async getRolesAsync(getRoleAsyncInput: GetRoleAsyncInput): Promise<GetRoleAsyncOutput> {
    var result = await http.get('services/app/Role/GetRolesAsync', { params: getRoleAsyncInput });
    console.log(result);
    return result.data.result;
  }

  public async update(updateRoleInput: UpdateRoleInput): Promise<UpdateRoleOutput> {
    var result = await http.put('services/app/Role/Update', updateRoleInput);
    console.log(result);
    return result.data.result as UpdateRoleOutput;
  }

  public async Delete(entityDto: EntityDto) {
    var result = await http.delete('services/app/Role/Delete', { params: entityDto });
    console.log(result);
    return result.data;
  }

  public async getAllPermissions() {
    var result = await http.get('services/app/Role/GetAllPermissions');
    console.log(result);
    return result.data;
  }

  public async getRoleForEdit(entityDto: EntityDto) {
    var result = await http.get('services/app/Role/GetRoleForEdit', { params: entityDto });
    console.log(result);
    return result.data;
  }

  public async get(entityDto: EntityDto) {
    var result = await http.get('services/app/Role/Get', { params: entityDto });
    console.log(result);
    return result.data;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest) {
    var result = await http.get('services/app/Role/GetAll', { params: pagedFilterAndSortedRequest });
    console.log(result);
    return result.data;
  }
}

export default new RoleService();
