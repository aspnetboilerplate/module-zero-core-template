import { action, observable } from 'mobx';

import userService from '@app/services/user/userService';
import { PagedResultDto } from '@app/services/dto/pagedResultDto';
import { GetUserOutput } from '@app/services/user/dto/getUserOutput';
import { UpdateUserInput } from '@app/services/user/dto/updateUserInput';
import { EntityDto } from '@app/services/dto/entityDto';
import { CreateOrUpdateUserInput } from '@app/services/user/dto/createOrUpdateUserInput';
import { GetRoles } from '@app/services/user/dto/getRolesOuput';
import { PagedUserResultRequestDto } from "@app/services/user/dto/PagedUserResultRequestDto";

class UserStore {
  @observable users: PagedResultDto<GetUserOutput>;
  @observable editUser: CreateOrUpdateUserInput;
  @observable roles: GetRoles[] = [];

  @action
  async create(createUserInput: CreateOrUpdateUserInput) {
    let result = await userService.create(createUserInput);
    this.users.items.push(result);
  }

  @action
  async update(updateUserInput: UpdateUserInput) {
    let result = await userService.update(updateUserInput);
    this.users.items = this.users.items.map((x: GetUserOutput) => {
      if (x.id == updateUserInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await userService.delete(entityDto);
    this.users.items = this.users.items.filter((x: GetUserOutput) => x.id != entityDto.id);
  }

  @action
  async getRoles() {
    let result = await userService.getRoles();
    this.roles = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await userService.get(entityDto);
    this.editUser = result;
  }

  @action
  async createUser() {
    this.editUser = {
      userName: '',
      name: '',
      surname: '',
      emailAddress: '',
      isActive: false,
      roleNames: [],
      password: '',
      id: 0,
    };
    this.roles = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedUserResultRequestDto) {
    let result = await userService.getAll(pagedFilterAndSortedRequest);
    this.users = result;
  }

  async changeLanguage(languageName: string) {
    await userService.changeLanguage({ languageName: languageName });
  }
}

export default UserStore;
