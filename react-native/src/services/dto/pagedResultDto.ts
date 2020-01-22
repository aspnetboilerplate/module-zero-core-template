export interface PagedResultDto<T> {
  totalCount: number;
  items: T[];
}
