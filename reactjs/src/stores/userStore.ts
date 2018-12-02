import { action, observable } from 'mobx';

import userService from 'src/services/user/userService';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import { GetUserOutput } from 'src/services/user/dto/getUserOutput';
import { UpdateUserInput } from 'src/services/user/dto/updateUserInput';
import { EntityDto } from 'src/services/dto/entityDto';
import { CreateOrUpdateUserInput } from 'src/services/user/dto/createOrUpdateUserInput';
import { GetRoles } from 'src/services/user/dto/getRolesOuput';

class UserStore {
  @observable users: PagedResultDto<GetUserOutput>;
  @observable editUser: CreateOrUpdateUserInput;
  @observable roles: GetRoles[] = [];

  @action
  async create(createUserInput: CreateOrUpdateUserInput) {
    
    var result = await userService.create(createUserInput);
    console.log(result);
    this.users.items.push(result);
  }

  @action
  async update(updateUserInput: UpdateUserInput) {
    
    var result = await userService.update(updateUserInput);
    console.log(result);
    this.users.items = this.users.items.map((x: GetUserOutput) => {
      if (x.id == updateUserInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    var result = await userService.delete(entityDto);
    console.log(result);

    this.users.items = this.users.items.filter((x: GetUserOutput) => x.id != entityDto.id);
  }

  @action
  async getRoles() {
    var result = await userService.getRoles();
    console.log(result);
    this.roles = result;
  }

  @action
  async get(entityDto: EntityDto) {
    var result = await userService.get(entityDto);
    console.log(result);
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
  async getAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest) {
    var result = await userService.getAll(pagedFilterAndSortedRequest);
    console.log(result);
    this.users = result;
  }

  async changeLanguage(languageName: string) {
    await userService.changeLanguage({ languageName: languageName });
  }
}

export default UserStore;
