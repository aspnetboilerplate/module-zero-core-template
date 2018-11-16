import {  action, observable } from 'mobx';
import { CreateUserInput } from 'src/services/user/dto/createUserInput';
import userService from 'src/services/user/userService';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import { GetUserOutput } from 'src/services/user/dto/getUserOutput';
import { UpdateUserInput } from 'src/services/user/dto/updateUserInput';
import { EntityDto } from 'src/services/dto/entityDto';

class UserStores {
       @observable
       users:PagedResultDto<GetUserOutput>
   

    @action async create(createUserInput: CreateUserInput) {
        var result = await userService.create(createUserInput);
        console.log(result);
        this.users.items.push(result);
    }

    @action async update(updateUserInput: UpdateUserInput) {
        var result = await userService.update(updateUserInput);
        console.log(result);
        this.users.items.filter((x: GetUserOutput) => x.id == updateUserInput.id).map((x: GetUserOutput) => {
            return x = result;
        })
    }

    @action async delete(entityDto: EntityDto) {
        // var result = await userService.delete(entityDto);
        // console.log(result);
        
        this.users.items=this.users.items.filter((x: GetUserOutput) => x.id != entityDto.id);
    }

    @action async get(entityDto: EntityDto) {
        var result = await userService.get(entityDto);
        console.log(result);

    }

    @action async getAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest) {
        var result = await userService.getAll(pagedFilterAndSortedRequest);
        console.log(result);
        this.users = result;
    }
}

export default new UserStores();
