export interface Address {
  city_provinces?: any;
  districts?: any;
  communes?: any;
  villages?: any;
  detail?: string;
  street?: string;
  house_number?: string;
  name?: string;
}

export interface AddressResponse {
  city_provinces?: CityProvince;
  districts?: District;
  communes?: Commune;
  villages?: Village;
  detail?: string;
}

export interface CityProvince {
  _id?: number;
  name: string;
}

export interface District {
  _id?: number;
  name: string;
  city_provinces: number;
}

export interface Commune {
  _id?: number;
  name: string;
  districts: number;
}

export interface Village {
  _id?: number;
  name: string;
  communes: number;
}

export interface Nationality {
  _id?: number;
  nationality_en?: string;
  nationality?: string;
  name?: string;
}

export type BaseKeyAddress = 'baseProvince' | 'baseDistrict' | 'baseCommune' | 'baseVillage';
