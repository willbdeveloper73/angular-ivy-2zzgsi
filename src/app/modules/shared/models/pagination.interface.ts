import { BaseName } from './base-name.interface';

export interface Pagination extends BaseName {
  total?: number;
  currentPage?: number;
  itemsPerPage?: number;

  disabled?: boolean;
  hidePageSize?: boolean;
  listLength?: number;
  pageIndex?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  showFirstLastButtons?: boolean;
  page: number;
}
