import { EntityDto } from './../../dto/entityDto';

export default class UserLoginInfoDto extends EntityDto {
  name!: string;
  surname!: string;
  userName!: string;
  emailAddress!: string;
}
