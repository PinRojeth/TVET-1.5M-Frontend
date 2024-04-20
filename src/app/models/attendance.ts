import { Course } from './course';
import { MongoObject } from './mongo-object';
import { School } from './school';
import { ScholarshipPayment, Student } from './student';

export interface AttendanceStudentRecord extends MongoObject {
  status?: number;
  start_date?: Date;
  end_date?: Date;
  staffs?: string;
  schools?: string;
  createdAt?: Date;
  updatedAt?: Date;
  data?: AttendanceItem[];
  students?: string[];
  submit_date?: Date;
  request?: number;
  scholarships_payment?: ScholarshipPayment;
  year?: number;
  month?: number;
}

export interface AttendanceItem {
  students: Student;
  attendances: AttendanceDate[];
  present?: number;
  absent?: number;
  permission?: number;
  scholarship_payments?: ScholarshipPayment;
}

export interface AttendanceDate extends MongoObject {
  attendance_data?: AttendanceData[];
  shift_times?: string;
  shift_time?: string;
}

export interface AttendanceData {
  date: string;
  dateDisplay?: string;
  attendance_type: number;
  dateArray?: any[];
}

export interface Attendance extends MongoObject {
  day: number;
  month: number;
  year: number;
  schools: School;
  student_count: number;
  name: string;
  name_en: string;
  date: Date;
  status?: number;
  staffs?: string;
  courses?: Course;
  createdAt?: Date;
  data: Student[];
  students?: Student[];
  submit_date?: Date;
  payment_count?: number;
  start_date?: Date;
  end_date?: Date;
}

export interface AttendanceRecord {
  date?: string;
  courses?: string;
  data: AttendanceScore[];
  month?: number;
  year?: number;
}

export interface AttendanceScore {
  students: string;
  attendance_score: number;
}
