import CreateTenantInput from './dto/createTenantInput';
import GetTenantOutput from './dto/getTenantOutput';
import { GetAllTenantOutput } from './dto/getAllTenantOutput';
import UpdateTenantOutput from './dto/updateTenantOutput';
import { EntityDto } from 'src/services/dto/entityDto';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import http from '../httpService';
import UpdateTenantInput from './dto/updateTenantInput';
import CreateTenantOutput from './dto/createTenantOutput';

class TenantService {
  public async create(createTenantInput: CreateTenantInput): Promise<CreateTenantOutput> {
    let result = await http.post('api/services/app/Tenant/Create', createTenantInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Tenant/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetTenantOutput> {
    let result = await http.get('api/services/app/Tenant/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest): Promise<PagedResultDto<GetAllTenantOutput>> {
    let result = await http.get('api/services/app/Tenant/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }

  public async update(updateTenantInput: UpdateTenantInput): Promise<UpdateTenantOutput> {
    let result = await http.put('api/services/app/Tenant/Update', updateTenantInput);
    return result.data.result;
  }
}

export default new TenantService();
