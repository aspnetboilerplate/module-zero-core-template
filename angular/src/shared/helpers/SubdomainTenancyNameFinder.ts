import { AppConsts } from '@shared/AppConsts';
import { FormattedStringValueExtracter } from '@shared/helpers/FormattedStringValueExtracter';

export class SubdomainTenancyNameFinder {
    urlHasTenancyNamePlaceholder(url: string): boolean {
        return url.indexOf(AppConsts.tenancyNamePlaceHolderInUrl) >= 0;
    }

    getCurrentTenancyNameOrNull(rootAddress: string): string | null {
        if (rootAddress.indexOf(AppConsts.tenancyNamePlaceHolderInUrl) < 0) {
            // Web site does not support subdomain tenant name
            return null;
        }

        const currentRootAddress = document.location.href;

        const formattedStringValueExtracter = new FormattedStringValueExtracter();
        const values: any[] = formattedStringValueExtracter.IsMatch(currentRootAddress, rootAddress);
        if (!values.length) {
            return null;
        }

        return values[0];
    }
}
