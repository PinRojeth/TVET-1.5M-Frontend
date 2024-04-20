import { Address, Nationality } from './address';
import { Department } from './department';
import { MongoObject } from './mongo-object';
import { Roles } from './roles';
import { School } from './school';
import { Accounts, User } from './user';

export interface Staff extends MongoObject {
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
  schools?: School;
  user_departments?: Department;
  profile_image?: string;
  username: string;
  password: string;
  code?: string;
  accounts?: Accounts;
  nationality?: Nationality;
  ethnicity?: Nationality;
  token?: string;
  refresh_token?: string;
  users?: User;
}
