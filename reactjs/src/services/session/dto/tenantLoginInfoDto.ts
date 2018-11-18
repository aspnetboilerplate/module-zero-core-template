import { EntityDto } from 'src/services/dto/entityDto';

export default class TenantLoginInfoDto extends EntityDto {
  tenancyName: string;
  name: string;
}
