import { Sector } from "./sector";

export interface Major {
  _id?: string;
  name?: string;
  name_en?: string;
  code?: string;
  description?: string;
  status?: number;
  duration?: number;
  fee?: number;
  requirement?: any;
  student_amount?: number;
  sectors: Sector;
}
