export interface Filter {
  title?: string;
  use?: boolean;
  data: OptionValue[];
  labelFunc: string;
  selectedValue?: Option;
  selectedIndex?: number;
  matIcon?: string;
  svgIcon?: string;
  paramKey?: useFilter;
  isMultiple?: boolean;
  dep?: useFilter;
  hasSearch?: boolean;
  translate?: string;
}
export interface Option {
  value: any;
  label: string;
}
export interface OptionValue {
  value: string | null | number;
  label: string;
  translate?: boolean;
}

export interface OptionParam {
  value: any;
  labelParam: string;
  paramKey?: useFilter;
}

export type useFilter =
  | 'gender'
  | 'status'
  | 'subjects'
  | 'roles'
  | 'grades'
  | 'staffs'
  | 'year'
  | 'programs'
  | 'generations'
  | 'academic_years'
  | 'owned_by'
  | 'status_request'
  | 'students'
  | 'categories'
  | 'departments'
  | 'schools'
  | 'month';
