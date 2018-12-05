import RoleStore from './roleStore';
import TenantStore from './tenantStore';
import UserStore from './userStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';
import AccountStore from './accountStore';

export default class Stores {
  static AuthenticationStore: string = getName(AuthenticationStore);
  static RoleStore: string = getName(RoleStore);
  static TenantStore: string = getName(TenantStore);
  static UserStore: string = getName(UserStore);
  static SessionStore: string = getName(SessionStore);
  static AccountStore: string = getName(AccountStore);
}

function getName(store: any): string {
  return abp.utils.toCamelCase(store.name);
}
