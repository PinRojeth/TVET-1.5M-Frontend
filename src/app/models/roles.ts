export interface Roles {
    _id?: number;
    role_name?: string;
    status?: number;
    permissions: any[];
    name?: string;
    schools?: boolean;
    user_departments?: boolean;
}
