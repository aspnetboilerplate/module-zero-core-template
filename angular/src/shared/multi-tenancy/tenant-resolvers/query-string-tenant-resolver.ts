import { UrlHelper } from '../../helpers/UrlHelper';

export class QueryStringTenantResolver {

    resolve(appBaseUrl): string {
        let queryParams = UrlHelper.getQueryParameters();
        console.log('queryParams');
        console.log(queryParams);
        return queryParams['abp_tenancy_name'];
    }

}