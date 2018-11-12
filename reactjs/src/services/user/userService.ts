import { CreateUserInput } from './dto/createUserInput';
import { UpdateUserInput } from './dto/updateUserInput';
import { ChangeLanguagaInput } from './dto/changeLanguageInput';
import { GetUserOutput } from './dto/getUserOutput';
import { EntityDto } from 'src/services/dto/entityDto';
import http from '../httpService';
import { GetAllUserOutput } from './dto/getAllUserOutput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';

class UserService {
  public async create(createUserInput: CreateUserInput) {
    var result = await http.post('services/app/User/Create', createUserInput);
    console.log(result);
    return result.data;
  }

  public async update(updateUserInput: UpdateUserInput) {
    var result = await http.put('services/app/User/Update', updateUserInput);
    console.log(result);
    return result.data;
  }

  public async delete(entityDto: EntityDto) {
    var result = await http.delete('services/app/User/Delete', { params: entityDto });
    console.log(result);
    return result.data;
  }

  public async getRoles() {
    var result = await http.get('services/app/User/GetRoles');
    console.log(result);
    return result.data;
  }

  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    var result = await http.post('services/app/User/ChangeLanguage', changeLanguageInput);
    console.log(result);
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetUserOutput> {
    var result = await http.get('services/app/User/Get', { params: entityDto });
    console.log(result);
    return result.data;
  }

  public async GetAll(pagedFilterAndSortedRequest: PagedFilterAndSortedRequest): Promise<PagedResultDto<GetAllUserOutput>> {
    var result = await http.get('services/app/User/GetAll', { params: pagedFilterAndSortedRequest });
    console.log(result);
    return result.data;
  }
}

export default new UserService();
