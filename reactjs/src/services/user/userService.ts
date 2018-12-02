
import { UpdateUserInput } from './dto/updateUserInput';
import { ChangeLanguagaInput } from './dto/changeLanguageInput';
import { EntityDto } from 'src/services/dto/entityDto';
import http from '../httpService';
import { GetAllUserOutput } from './dto/getAllUserOutput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import { CreateOrUpdateUserInput } from './dto/createOrUpdateUserInput';

class UserService {
  public async create(createUserInput: CreateOrUpdateUserInput) {
    var result = await http.post('api/services/app/User/Create', createUserInput);
    console.log(result);
    return result.data.result;
  }

  public async update(updateUserInput: UpdateUserInput) {
    console.log(JSON.stringify(updateUserInput));
    var result = await http.put('api/services/app/User/Update', updateUserInput);
    console.log(result);
    return result.data;
  }

  public async delete(entityDto: EntityDto) {
    var result = await http.delete('api/services/app/User/Delete', { params: entityDto });
    console.log(result);
    return result.data;
  }

  public async getRoles() {
    var result = await http.get('api/services/app/User/GetRoles');
    console.log(result);
    return result.data.result.items;
  }

  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    var result = await http.post('api/services/app/User/ChangeLanguage', changeLanguageInput);
    console.log(result);
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateUserInput> {
    var result = await http.get('api/services/app/User/Get', { params: entityDto });
    console.log(result);
    return result.data.result;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest): Promise<PagedResultDto<GetAllUserOutput>> {
    var result = await http.get('api/services/app/User/GetAll', { params: pagedFilterAndSortedRequest });
    console.log(result);
    return result.data.result;
  }
}

export default new UserService();
