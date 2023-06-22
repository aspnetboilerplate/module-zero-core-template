import { SubdomainTenancyNameFinder } from '@shared/helpers/SubdomainTenancyNameFinder';

export class SubdomainTenantResolver {

    resolve(appBaseUrl): string {
        const subdomainTenancyNameFinder = new SubdomainTenancyNameFinder();
        return subdomainTenancyNameFinder.getCurrentTenancyNameOrNull(appBaseUrl);
    }

}