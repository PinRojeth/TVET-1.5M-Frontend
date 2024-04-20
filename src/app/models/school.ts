import { Address } from './address';
import { Course } from './course';
import { Major } from './major';
import { StudentDataReport } from './report';
import { Sector } from './sector';

export interface School {
  _id?: string;
  status?: 1;
  name?: string;
  name_en?: string;
  apply_majors?: Major[];
  code?: string;
  profile_image?: string;
  major_count?: number;
  description?: string;
  address?: Address;
  phone_number?: number;
  email?: string;
  website?: string;
  create_by?: string;
  create_number?: number;
  create_date?: any;
  register_by?: string;
  register_number?: number;
  register_date?: any;
  code_en?: string;
  courses?: Course[];
  id_code?: string;
  student_data?: StudentDataReport[];
  sectors?: Sector[];
}
