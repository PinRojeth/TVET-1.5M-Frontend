import { RequestErrorEnum } from "./enums/request-error.enum";

export interface RequestError{
    error_type: RequestErrorEnum|String,
    message: string;
    errors?: any[]
}