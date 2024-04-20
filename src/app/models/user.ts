import { Address, Nationality } from './address';
import { MongoObject } from './mongo-object';
import { Roles } from './roles';

export interface User extends MongoObject {
  status?: number;
  email?: string;
  phone_number?: string;
  roles?: Roles;
  staff_id?: string;
  first_name: string;
  last_name: string;
  first_name_en: string;
  last_name_en: string;
  gender: string;
  date_of_birth: Date;
  place_of_birth?: any;
  address?: Address;
  schools?: string;
  profile_image?: string;
  username: string;
  password: string;
  code?: string;
  accounts?: Accounts;
  nationality?: Nationality;
  ethnicity?: Nationality;
  external_users?: any;
}

export interface Accounts extends MongoObject {
  status: number;
  staffs?: string;
  roles?: Roles;
  username?: string;
}
