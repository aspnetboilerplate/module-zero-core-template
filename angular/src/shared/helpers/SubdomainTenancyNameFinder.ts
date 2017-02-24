import { AppConsts } from '@shared/AppConsts';
import { FormattedStringValueExtracter } from '@shared/helpers/FormattedStringValueExtracter';

export class SubdomainTenancyNameFinder {


    getCurrentTenancyNameOrNull(rootAddress: string): string {
        if (rootAddress.indexOf(AppConsts.tenancyNamePlaceHolderInUrl) < 0) {
            //Web site does not support subdomain tenant name
            return null;
        }


        var currentRootAddress = document.location.href;

        let formattedStringValueExtracter = new FormattedStringValueExtracter();
        let values: any[] = formattedStringValueExtracter.IsMatch(currentRootAddress, rootAddress);
        if (!values.length) {
            return null;
        }

        return values[0];
    }

}