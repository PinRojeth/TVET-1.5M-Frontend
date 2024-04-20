export interface AddButton {
  svgIcon?: string;
  matIcon?: string;
  label: string;
  permission?: boolean;
  translate?: string;
  router?: RouterQuery; // use for add new button actions
}

export interface ButtonPermission {
  view?: boolean;
  edit?: boolean;
  delete?: boolean;
}

export interface RouterQuery {
  routerLink: string | any[];
  queryParam?: { [key: string]: string | number };
}

export interface ButtonRouter {
  view?: RouterQuery;
  edit?: RouterQuery;
}
