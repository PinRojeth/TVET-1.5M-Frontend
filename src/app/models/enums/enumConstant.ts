export default class EnumConstant {
  public static readonly ACTIVE = 1;
  public static readonly INACTIVE = 0;
  public static readonly DISABLED = -2;
  public static readonly APPROVED = 1;
  public static readonly REQUESTED = 4;
  public static readonly PENDING = 5;
  public static readonly REJECTED = -4;
  public static readonly DELETE = -9;
  public static readonly CANCEL = 9;
  public static readonly EXPIRED = 8;

  public static readonly PUBLIC = 1;
  public static readonly DRAFT = 2;
  public static readonly DISABLE_OWN = -1;
  public static readonly REQUESTING = 3;
  public static readonly REJECT = -3;
  public static readonly UNPUBLISHED = -1;
  public static readonly PUBLISHED = 1;
  public static readonly VERIFIED = 1;
  public static readonly REQUEST_POOR_ID = 1;
  public static readonly FINISH_STUDY = 8;
  public static readonly QUIT_BFORE_COURSE = 10;
  public static readonly QUIT_DURING_COURSE = 11;

  public static readonly Gender = {
    MALE: 'male',
    FEMALE: 'female'
  };

  public static readonly ReadPermission = {
    PUBLIC: 1,
    PRIVATE: -1
  };

  public static readonly DataType = {
    INPUT: 1,
    OPTION: 2,
    YEAR: 3,
    DATE: 4,
    NUMBER: 5
  };
}

export enum Role {
  ALL = 'all',
  ADMIN = 'admin',
  VIEWER = 'viewer'
}

export enum RoleId {
  ADMIN = 1,
  USER = 2,
  DEPARTMENT = 3,
  SCHOOL = 11
}

export enum UserStatusEnum {
  active = 1,
  pending = 0,
  inactive = -1,
  disable = -2
}

export enum BaseKeyAddressEnum {
  BASE_PROVINCE = 'baseProvince',
  BASE_DISTRICT = 'baseDistrict',
  BASE_COMMUNE = 'baseCommune',
  BASE_VILLAGE = 'baseVillage',
  BASE_CURRENT_PROVINCE = 'baseProvince',
  BASE_CURRENT_DISTRICT = 'baseCurrentDistrict',
  BASE_CURRENT_COMMUNE = 'baseCurrentCommune',
  BASE_CURRENT_VILLAGE = 'baseCurrentVillage'
}

export enum StudentFinishEnum {
  GRADUATED = 1,
  DEATH = 2,
  QUIT = 3,
  FAKE_INFO = 4,
  SUSPEND = 5,
  MISSING_DOCUMENT = 6
}

export enum AttendanceType {
  PRESENT = 1,
  ABSENT = 2,
  PERMISSION = 3
}
