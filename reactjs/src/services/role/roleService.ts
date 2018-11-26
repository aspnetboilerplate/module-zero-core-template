import { CreateRoleInput } from './dto/createRoleInput';
import { CreateRoleOutput } from './dto/createRoleOutput';
import GetRoleAsyncOutput from './dto/getRoleAsyncOutput';
import { UpdateRoleInput } from './dto/updateRoleInput';
import { UpdateRoleOutput } from './dto/updateRoleOutput';
import { EntityDto } from '../dto/entityDto';
import http from '../httpService';
import { GetAllRoleOutput } from './dto/getAllRoleOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { GetRoleForEditOutput } from './dto/getRoleForEditOutput';

class RoleService {
  public async create(createRoleInput: CreateRoleInput): Promise<PagedResultDto<CreateRoleOutput>> {
    var result = await http.post('api/services/app/Role/Create', createRoleInput);
    console.log(result);
    return result.data.result;
  }

  public async getRolesAsync(getRoleAsyncInput: GetRoleAsyncInput): Promise<GetRoleAsyncOutput> {
    var result = await http.get('api/services/app/Role/GetRolesAsync', { params: getRoleAsyncInput });
    console.log(result);
    return result.data.result;
  }

  public async update(updateRoleInput: UpdateRoleInput): Promise<UpdateRoleOutput> {
    var result = await http.put('api/services/app/Role/Update', updateRoleInput);
    console.log(result);
    return result.data.result as UpdateRoleOutput;
  }

  public async delete(entityDto: EntityDto) {
    var result = await http.delete('api/services/app/Role/Delete', { params: entityDto });
    console.log(result);
    return result.data;
  }

  public async getAllPermissions() {
    var result = await http.get('api/services/app/Role/GetAllPermissions');
    console.log(result);
    return result.data.result.items;
  }

  public async getRoleForEdit(entityDto: EntityDto): Promise<GetRoleForEditOutput> {
    var result = await http.get('api/services/app/Role/GetRoleForEdit', { params: entityDto });
    console.log(result);
    return result.data.result;
  }

  public async get(entityDto: EntityDto) {
    var result = await http.get('api/services/app/Role/Get', { params: entityDto });
    console.log(result);
    return result.data;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest): Promise<PagedResultDto<GetAllRoleOutput>> {
    var result = await http.get('api/services/app/Role/GetAll', { params: pagedFilterAndSortedRequest });
    console.log(result);

    return result.data.result;
  }
}

export default new RoleService();
