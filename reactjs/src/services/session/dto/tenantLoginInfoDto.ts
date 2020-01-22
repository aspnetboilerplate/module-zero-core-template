import { EntityDto } from '../../../services/dto/entityDto';

export default class TenantLoginInfoDto extends EntityDto {
  tenancyName!: string;
  name!: string;
}
