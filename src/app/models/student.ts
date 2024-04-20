import { Address, Nationality } from './address';
import { Course } from './course';
import { FileObject, ImageList } from './file';
import { Major } from './major';
import { MongoObject } from './mongo-object';
import { School } from './school';
import { Shift } from './shift';
import { TypeEnum } from './type_enum';
import { User } from './user';

export interface Student {
  _id?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  phone_number?: string;
  profile_image?: string;
  poor_id?: string;
  selected?: boolean;
  is_check?: boolean;
  disabled?: boolean;
  poor_status?: number;
  scholarship_status?: number;
  shift_times?: Shift[];
  attendance_score?: number;
  average_attendance?: number;
  scholarship_payments?: ScholarshipPayment;
  attachment_files?: ImageList[];
  users?: User;
  id_card_number?: number;
  address?: Address;
  request_timelines?: RequestTimeLine;
  place_of_birth?: Address;
  schools?: School;
  first_name_en?: string;
  last_name_en?: string;
  date_of_birth?: Date;
  nationality?: Nationality;
  ethnicity?: Nationality;
  apply_majors?: Major;
  courses?: Course;
  status?: number;
  verify_status?: number;
  change_course?: number;
  type_poverty_status?: string;
  type_scholarship_documents?: any;
  poor_member_uuid?: string;
}

export interface StudentRequests extends Student {
  apply_majors?: Major;
  schools?: School;
  shifts?: Shift;
}

export interface ApprovedStudent extends Student {
  apply_majors?: Major;
  schools?: School;

  first_name_en?: string;
  last_name_en?: string;
  date_of_birth?: Date;
  place_of_birth?: Address;
  address?: Address;
  nationality?: Nationality;
  ethnicity?: Nationality;
  poor_card_data?: PoorCardData;
  poor_file_datas?: FileObject;
  query_poor_data?: boolean;
}

interface PoorCardData {
  address: Address;
  created_at: Date;
  expire_at: Date;
  family_members: FamilyMember;
  is_valid: boolean;
  poverty_status: string;
}

export interface FamilyMember {
  date_of_birth: Date;
  first_name: string;
  last_name: string;
  gender: string;
  relation_to_head: string;
  is_apply?: boolean;
  phone_number?: string;
  id_card_number?: string;
  uuid?: string;
}

export interface RequestTimeLine extends MongoObject {
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
  create_by: Student;
  quit_type: number;
  reason?: string;
  name?: string;
}

export interface StudentRequestQuit {
  students: string;
  quit_type: number;
  reason?: string;
}

export interface StudentAttendance extends MongoObject {
  students: string;
  description: string;
  present: number;
  absent: number;
  permission: number;
  year: number;
  month: number;
  staffs?: string;
  schools?: string;
  status?: number;
}

export interface CheckMonthExisted {
  students: string;
  year: number;
  month: number;
  exist?: boolean;
  model?: string;
}

export interface ApplyStudent {
  poor_id?: string;
  created_at?: string;
  expire_at?: string;
  is_valid?: boolean;
  poverty_status?: string;
  address?: Address;
  family_members?: FamilyMember[];
  date_of_birth?: Date;
}

export interface ScholarshipPayment extends MongoObject {
  month: number;
  paid_amount: number;
  reason: string;
  status: number;
  students: string;
  year: number;
}
