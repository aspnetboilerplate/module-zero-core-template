import ApplicationInfoDto from './applicationInfoDto';
import UserLoginInfoDto from './userLoginInfoDto';
import TenantLoginInfoDto from './tenantLoginInfoDto';

export class GetCurrentLoginInformations {
  application: ApplicationInfoDto;
  user: UserLoginInfoDto;
  tenant: TenantLoginInfoDto;
}
