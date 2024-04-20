import { RequestValidation } from '../request-validation';

export interface BadRequestResposne {
  errors: RequestValidation[];
  message: string;
}
