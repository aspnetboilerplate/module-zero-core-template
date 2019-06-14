import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedRoleResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
