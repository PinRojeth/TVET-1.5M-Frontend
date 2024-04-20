export interface BaseResponse<T = any> {
  status: number;
  message: string;
  errors?: any[];
  data: T;
}
