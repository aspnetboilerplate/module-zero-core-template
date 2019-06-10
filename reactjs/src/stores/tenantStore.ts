import { action, observable } from 'mobx';

import CreateTenantInput from '../services/tenant/dto/createTenantInput';
import { EntityDto } from '../services/dto/entityDto';
import { GetAllTenantOutput } from '../services/tenant/dto/getAllTenantOutput';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedTenantResultRequestDto } from '../services/tenant/dto/PagedTenantResultRequestDto';
import TenantModel from '../models/Tenants/TenantModel';
import UpdateTenantInput from '../services/tenant/dto/updateTenantInput';
import tenantService from '../services/tenant/tenantService';

class TenantStore {
  @observable tenants!: PagedResultDto<GetAllTenantOutput>;
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
      if (x.id === updateTenantInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await tenantService.delete(entityDto);
    this.tenants.items = this.tenants.items.filter((x: GetAllTenantOutput) => x.id !== entityDto.id);
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await tenantService.get(entityDto);
    this.tenantModel = result;
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedTenantResultRequestDto) {
    let result = await tenantService.getAll(pagedFilterAndSortedRequest);
    this.tenants = result;
  }
}

export default TenantStore;
