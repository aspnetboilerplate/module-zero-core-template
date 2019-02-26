import { EntityDto } from '@app/services/dto/entityDto';

export default class TenantLoginInfoDto extends EntityDto {
  tenancyName: string;
  name: string;
}
