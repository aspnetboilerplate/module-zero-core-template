export interface PagedResultDto<T> {
  totalCount: number;
  items: Array<T>;
}
