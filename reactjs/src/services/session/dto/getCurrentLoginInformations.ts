import ApplicationInfoDto from './applicationInfoDto';
import TenantLoginInfoDto from './tenantLoginInfoDto';
import UserLoginInfoDto from './userLoginInfoDto';

export class GetCurrentLoginInformations {
  application!: ApplicationInfoDto;
  user!: UserLoginInfoDto;
  tenant!: TenantLoginInfoDto;
}
