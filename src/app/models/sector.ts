import { Major } from "./major";

export interface Sector {
  _id?: string;
  name?: string;
  name_en?: string;
  code?: string;
  status?: number;
  apply_majors?: Major[];
}
