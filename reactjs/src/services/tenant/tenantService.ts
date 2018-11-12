import CreateTenantInput from './dto/createTenantInput';
import CreateTenantOutput from './dto/creteTenantOutput';
import GetTenantOutput from './dto/getTenantOutput';
import { GetAllTenantOutput } from './dto/getAllTenantOutput';
import UpdateTenantOutput from './dto/updateTenantOutput';
import { EntityDto } from 'src/model/entityDto';
import { PagedResultDto } from 'src/model/pagedResultDto';
import http from '../httpService';

class TenantService {
  public async create(
    createTenantInput: CreateTenantInput,
  ): Promise<CreateTenantOutput> {
    var result = await http.post(
      'services/app/Tenant/Create',
      createTenantInput,
    );
    console.log(result);
    return result;
  }
  public async delete(entityDto: EntityDto) {
    var result = await http.delete('services/app/Tenant/Delete', entityDto);
    console.log(result);
    return result;
  }
  public async get(entityDto: EntityDto): Promise<GetTenantOutput> {
    var result = await http.get('services/app/Tenant/Get', entityDto);
    console.log(result);
    return result;
  }
  public async getAll(
    pagedFilterAndSortedRequest: PagedFilterAndSortedRequest,
  ): Promise<PagedResultDto<GetAllTenantOutput>> {
    var result = await http.get(
      'services/app/Tenant/GetAll',
      pagedFilterAndSortedRequest,
    );
    console.log(result);
    return result;
  }

  public async update(
    updateTenantInput: UpdateTenantInput,
  ): Promise<UpdateTenantOutput> {
    var result = await http.get(
      'services/app/Tenant/Update',
      updateTenantInput,
    );
    console.log(result);
    return result;
  }
}

export default new TenantService();
