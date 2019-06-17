import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedUserResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
