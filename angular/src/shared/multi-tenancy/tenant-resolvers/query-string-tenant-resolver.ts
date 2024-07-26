import { UrlHelper } from '../../helpers/UrlHelper';

export class QueryStringTenantResolver {

    resolve(appBaseUrl): string {
        let queryParams = UrlHelper.getQueryParameters();
        return queryParams['abp_tenancy_name'];
    }

}