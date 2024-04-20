import { Major } from './major';
import { School } from './school';
import { Shift } from './shift';

export interface Course {
  _id?: string;
  code?: string;
  duration?: number;
  fee?: number;
  requirement?: any;
  student_amount?: number;
  registation_start?: Date;
  registation_end?: Date;
  apply_majors?: Major;
  status?: number;
  archive?: number;
  shifts?: Shift;
  course_start?: Date;
  course_end?: Date;
  schools?: School;
  name?: string;
  name_en?: string;
}
