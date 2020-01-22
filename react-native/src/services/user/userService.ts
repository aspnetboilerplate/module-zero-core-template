import { UpdateUserInput } from './dto/updateUserInput';
import { ChangeLanguagaInput } from './dto/changeLanguageInput';
import { EntityDto } from 'src/services/dto/entityDto';
import http from '../httpService';
import { GetAllUserOutput } from './dto/getAllUserOutput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import { CreateOrUpdateUserInput } from './dto/createOrUpdateUserInput';

class UserService {
  public async create(createUserInput: CreateOrUpdateUserInput) {
    let result = await http.post('api/services/app/User/Create', createUserInput);
    return result.data.result;
  }

  public async update(updateUserInput: UpdateUserInput) {
    let result = await http.put('api/services/app/User/Update', updateUserInput);
    return result.data;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/User/Delete', { params: entityDto });
    return result.data;
  }

  public async getRoles() {
    let result = await http.get('api/services/app/User/GetRoles');
    return result.data.result.items;
  }

  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    let result = await http.post('api/services/app/User/ChangeLanguage', changeLanguageInput);
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateUserInput> {
    let result = await http.get('api/services/app/User/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest): Promise<PagedResultDto<GetAllUserOutput>> {
    let result = await http.get('api/services/app/User/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new UserService();
