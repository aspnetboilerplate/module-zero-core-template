import { observable, action } from 'mobx';
import { GetAllTenantOutput } from 'src/services/tenant/dto/getAllTenantOutput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import tenantService from 'src/services/tenant/tenantService';
import CreateTenantInput from 'src/services/tenant/dto/createTenantInput';
import UpdateTenantInput from 'src/services/tenant/dto/updateTenantInput';
import { EntityDto } from 'src/services/dto/entityDto';
import TenantModel from 'src/models/Tenants/TenantModel';

class TenantStore {
  @observable tenants: PagedResultDto<GetAllTenantOutput>;
  @observable tenantModel: TenantModel = new TenantModel();

  @action
  async create(createTenantInput: CreateTenantInput) {
    await tenantService.create(createTenantInput);
  }

  @action
  async createTenant() {
    this.tenantModel = {
      id: 0,
      isActive: true,
      name: '',
      tenancyName: '',
    };
  }

  @action
  async update(updateTenantInput: UpdateTenantInput) {
    let result = await tenantService.update(updateTenantInput);

    this.tenants.items = this.tenants.items.map((x: GetAllTenantOutput) => {
      if (x.id == updateTenantInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await tenantService.delete(entityDto);
    this.tenants.items = this.tenants.items.filter((x: GetAllTenantOutput) => x.id != entityDto.id);
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await tenantService.get(entityDto);
    this.tenantModel = result;
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest) {
    let result = await tenantService.getAll(pagedFilterAndSortedRequest);
    this.tenants = result;
  }
}

export default TenantStore;
