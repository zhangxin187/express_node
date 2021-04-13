import { UserData } from './user';

// mongoose分页查询的数据
export interface PaginationData {
  docs: UserData[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}
