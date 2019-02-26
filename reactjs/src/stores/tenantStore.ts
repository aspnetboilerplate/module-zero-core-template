import { observable, action } from 'mobx';
import { GetAllTenantOutput } from '@app/services/tenant/dto/getAllTenantOutput';
import { PagedResultDto } from '@app/services/dto/pagedResultDto';
import tenantService from '@app/services/tenant/tenantService';
import CreateTenantInput from '@app/services/tenant/dto/createTenantInput';
import UpdateTenantInput from '@app/services/tenant/dto/updateTenantInput';
import {PagedTenantResultRequestDto} from '@app/services/tenant/dto/PagedTenantResultRequestDto';
import { EntityDto } from '@app/services/dto/entityDto';
import TenantModel from '@app/models/Tenants/TenantModel';

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
  async getAll(pagedFilterAndSortedRequest: PagedTenantResultRequestDto) {
    let result = await tenantService.getAll(pagedFilterAndSortedRequest);
    this.tenants = result;
  }
}

export default TenantStore;
