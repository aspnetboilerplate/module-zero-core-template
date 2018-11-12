import { CreateUserInput } from './dto/createUserInput';
import { UpdateUserInput } from './dto/updateUserInput';
import { ChangeLanguagaInput } from './dto/changeLanguageInput';
import { GetUserOutput } from './dto/getUserOutput';
import { EntityDto } from '../../model/entityDto';
import http from '../httpService';
import { urlCreator } from '../servicesUrlCreator';
import { GetAllUserOutput } from './dto/getAllUserOutput';
import { PagedResultDto } from 'src/model/pagedResultDto';

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
    var result = await http.delete(
      urlCreator('services/app/User/Delete', entityDto),
    );
    console.log(result);
    return result.data;
  }
  public async getRoles() {
    var result = await http.get('services/app/User/GetRoles');
    console.log(result);
    return result.data;
  }
  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    var result = await http.post(
      'services/app/User/ChangeLanguage',
      changeLanguageInput,
    );
    console.log(result);
    return result.data;
  }
  public async get(entityDto: EntityDto): Promise<GetUserOutput> {
    var result = await http.get(urlCreator('services/app/User/Get', entityDto));
    console.log(result);
    return result.data;
  }

  public async GetAll(
    pagedFilterAndSortedRequest: PagedFilterAndSortedRequest
  ): Promise<PagedResultDto<GetAllUserOutput>> {
    var result = await http.get(
      urlCreator('services/app/User/GetAll', pagedFilterAndSortedRequest)
    );
    console.log(result);
    return result.data;
  }
}

export default new UserService();
