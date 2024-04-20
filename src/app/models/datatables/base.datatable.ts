export interface BaseDatatable<T = any[]> {
  list: T[];
  total: number;
  page: number;
  limit: number;
}
