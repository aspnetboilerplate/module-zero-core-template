import { observable, action } from 'mobx';
import { GetAllTenantOutput } from 'src/services/tenant/dto/getAllTenantOutput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import tenantService from 'src/services/tenant/tenantService';
import CreateTenantInput from 'src/services/tenant/dto/createTenantInput';
import UpdateTenantInput from 'src/services/tenant/dto/updateTenantInput';
import { EntityDto } from 'src/services/dto/entityDto';

class TenantStore {
  @observable tenants: PagedResultDto<GetAllTenantOutput>;

  @action
  async create(createTenantInput: CreateTenantInput) {
    var result = await tenantService.create(createTenantInput);
    console.log(result);
  }

  @action
  async update(updateTenantInput: UpdateTenantInput) {
    var result = await tenantService.update(updateTenantInput);
    console.log(result);
    this.tenants.items
      .filter((x: GetAllTenantOutput) => x.id == updateTenantInput.id)
      .map((x: GetAllTenantOutput) => {
        return (x = result);
      });
  }

  @action
  async delete(entityDto: EntityDto) {
    // var result = await tenantService.delete(entityDto);
    // console.log(result);
    this.tenants.items = this.tenants.items.filter((x: GetAllTenantOutput) => x.id != entityDto.id);
  }

  @action
  async get(entityDto: EntityDto) {
    var result = await tenantService.get(entityDto);
    console.log(result);
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest) {
    var result = await tenantService.getAll(pagedFilterAndSortedRequest);
    console.log(result);
    this.tenants = result;
  }
}

export default TenantStore;
