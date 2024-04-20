import { Major } from './major';
import { School } from './school';

export interface DateRange {
  start_date: string;
  end_date: string;
}

export interface StudentRequestReport {
  requestBySchool: any;
  requestByMajor: any;
}

export interface ApplyCountBySchool {
  start_date: Date;
  start_end: Date;
  header_columns: { _id: string; name: string }[];
  report_data: SchoolReport[];
  total_data?: StudentDataReport[];
}

export interface SchoolReport {
  _id?: number;
  schools?: School[];
  name: string;
  name_en: string;
  student_data: StudentDataReport[];
  apply_majors?: Major[];
}

export interface SchoolReportInfo {
  _id?: string;
  name: string;
  name_en: string;
  code: string;
}

export interface StudentDataReport {
  _id: number;
  total_student: number;
  total_female: number;
  name?: string;
  name_en?: string;
}

// export interface CourseDataReport {
//   start_date: Date;
//   end_date: Date;
// }
