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
   
    var result = await http.post('api/services/app/Tenant/Create', createTenantInput);   
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    var result = await http.delete('api/services/app/Tenant/Delete', { params: entityDto });
    console.log(result);
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetTenantOutput> {
    var result = await http.get('api/services/app/Tenant/Get', { params: entityDto });
    console.log(result);
    return result.data.result;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest): Promise<PagedResultDto<GetAllTenantOutput>> {
    var result = await http.get('api/services/app/Tenant/GetAll', { params: pagedFilterAndSortedRequest });
    console.log(result);
    return result.data.result;
  }

  public async update(updateTenantInput: UpdateTenantInput): Promise<UpdateTenantOutput> {
    var result = await http.put('api/services/app/Tenant/Update', updateTenantInput);
    console.log(result);
    return result.data.result;
  }
}

export default new TenantService();