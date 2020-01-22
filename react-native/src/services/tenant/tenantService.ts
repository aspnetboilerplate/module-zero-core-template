import CreateTenantInput from './dto/createTenantInput';
import CreateTenantOutput from './dto/createTenantOutput';
import { EntityDto } from '../../services/dto/entityDto';
import { GetAllTenantOutput } from './dto/getAllTenantOutput';
import GetTenantOutput from './dto/getTenantOutput';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import {PagedTenantResultRequestDto} from './dto/PagedTenantResultRequestDto';
import UpdateTenantInput from './dto/updateTenantInput';
import UpdateTenantOutput from './dto/updateTenantOutput';
import http from '../httpService';

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

  public async getAll(pagedFilterAndSortedRequest: PagedTenantResultRequestDto): Promise<PagedResultDto<GetAllTenantOutput>> {
    let result = await http.get('api/services/app/Tenant/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }

  public async update(updateTenantInput: UpdateTenantInput): Promise<UpdateTenantOutput> {
    let result = await http.put('api/services/app/Tenant/Update', updateTenantInput);
    return result.data.result;
  }
}

export default new TenantService();
