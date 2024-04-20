import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { datePickerValidator } from 'src/app/helpers/datepicker-validator';
import { passwordMatcher } from 'src/app/helpers/password-matcher';
import { Address, Nationality } from 'src/app/models/address';
import { Department } from 'src/app/models/department';
import { RoleId } from 'src/app/models/enums/enumConstant';
import { Roles } from 'src/app/models/roles';
import { School } from 'src/app/models/school';
import { Staff } from 'src/app/models/staff';
import { AddressService } from 'src/app/services/address.service';
import { DepartmentService } from 'src/app/services/department.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SchoolService } from 'src/app/services/school.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StaffService } from 'src/app/services/staff.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-human-resource-operation',
  templateUrl: './human-resource-operation.component.html',
  styleUrls: ['./human-resource-operation.component.scss']
})
export class HumanResourceOperationComponent implements OnInit {
  form: FormGroup;
  today = new Date();

  roles: Roles[];
  nationalities: Nationality[] = [];

  staffId: string;
  tab: string;
  profileImage: string = null;
  fileName: string = null;
  accountId: string;
  usernameRegex = /^(?=[a-zA-Z0-9._]{6,100}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  staff: Staff;
  address: Address;
  placeOfBirth: Address;
  role: Roles;

  hidePwd: boolean = true;
  hideConPwd: boolean = true;
  alreadyObtain: boolean = false;
  isHover: boolean = false;
  isLoading: boolean = false;
  isLargeScreen: boolean = false;
  backAble: boolean = true;

  getScreenWidth: number;
  roleCheck: number = RoleId.SCHOOL;
  schools: School[];
  userDepartments: Department[];

  params: Pagination = {
    page: 1,
    limit: 0,
    search: null
  };

  paramsDepartment: Pagination = {
    page: 1,
    limit: 0,
    search: null
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public staffService: StaffService,
    private schoolService: SchoolService,
    private departmentService: DepartmentService,
    public profileService: ProfileService,
    private addressService: AddressService,
    private snackbarService: SnackbarService
  ) {
    this.staffId = this.route.snapshot.paramMap.get('staffId');
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.getNationalities();
    this.getAvailableRole();

    if (!this.staffId) return;
    this.getInfo();
  }

  initFormGroup() {
    this.form = this.fb.group(
      {
        first_name: [null, Validators.required],
        last_name: [null, Validators.required],
        first_name_en: [null, Validators.required],
        last_name_en: [null, Validators.required],
        date_of_birth: [null, [Validators.required, datePickerValidator()]],
        gender: [null, Validators.required],
        roles: [null, Validators.required],
        schools: ['', Validators.required],
        user_departments: ['', Validators.required],
        phone_number: [null],
        ethnicity: [null, Validators.required],
        nationality: [null, Validators.required],
        place_of_birth: this.fb.group({
          city_provinces: [null],
          districts: [null],
          communes: [null],
          villages: [null],
          detail: [null]
        }),
        address: this.fb.group({
          city_provinces: [null],
          districts: [null],
          communes: [null],
          villages: [null],
          detail: [null]
        }),
        profile_image: [null],
        remove_profile_image: [false],
        username: [null, [Validators.required, Validators.minLength(6), Validators.pattern(this.usernameRegex)]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirm_password: [null, Validators.required]
      },
      {
        validators: passwordMatcher('password', 'confirm_password')
      }
    );
    this.form.get('schools').disable();
    this.form.get('user_departments').disable();
  }

  getInfo() {
    this.staffService.getById(this.staffId).subscribe({
      next: res => {
        this.staff = res;
        this.patchFormGroup(res);
      }
    });
  }

  patchFormGroup(res: Staff) {
    this.form.patchValue({
      code: res.code,
      first_name: res.first_name,
      last_name: res.last_name,
      first_name_en: res.first_name_en,
      last_name_en: res.last_name_en,
      date_of_birth: res.date_of_birth,
      gender: res.gender,
      phone_number: res.phone_number,
      place_of_birth: {
        city_provinces: res.place_of_birth?.city_provinces?._id,
        districts: res.place_of_birth?.districts?._id,
        communes: res.place_of_birth?.communes?._id,
        villages: res.place_of_birth?.villages?._id,
        detail: res.place_of_birth?.detail
      },
      address: {
        city_provinces: res.address?.city_provinces?._id,
        districts: res.address?.districts?._id,
        communes: res.address?.communes?._id,
        villages: res.address?.villages?._id,
        detail: res.address?.detail
      },
      profile_image: res.profile_image,
      roles: res?.users?.roles?._id,
      schools: res?.schools?._id,
      user_departments: res?.user_departments?._id,
      nationality: res?.nationality?._id,
      ethnicity: res?.ethnicity?._id
    });

    this.address = res.address;
    this.placeOfBirth = res.place_of_birth;

    // clear validation: username, password, confirm_password
    this.form.controls['username'].setErrors(null);
    this.form.controls['password'].setErrors(null);
    this.form.controls['confirm_password'].setErrors(null);
    this.form.markAsPristine();
    this.form.markAsUntouched();

    this.role = res?.users?.roles;
    if (res?.users?.roles?.schools) {
      this.form.get('schools').enable();
      this.getSchools();
    } else this.form.get('schools').disable();
    if (res?.users?.roles?.user_departments) {
      this.form.get('user_departments').enable();
      this.getUserDepartments();
    } else this.form.get('user_departments').disable();
  }

  fileChange(event: null | File): void {
    if (event != null) {
      this.form.patchValue({
        profile_image: event,
        remove_profile_image: false
      });
    } else {
      this.form.patchValue({
        profile_image: null,
        remove_profile_image: true
      });
    }
  }

  private formattedDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  private getNationalities() {
    this.addressService.getNationality().subscribe(res => {
      this.nationalities = res.list;
    });
  }

  private getAvailableRole() {
    this.staffService.getAvailableRole().subscribe({
      next: res => {
        this.roles = res.list;
      }
    });
  }

  onRolesChange(role: Roles) {
    if (role?.schools) {
      if (this.schools?.length < 1 || !this.schools) this.getSchools();
      this.form.get('schools').enable();
    } else this.form.get('schools').disable();

    if (role?.user_departments) {
      if (this.userDepartments?.length < 1 || !this.userDepartments) this.getUserDepartments();
      this.form.get('user_departments').enable();
    } else this.form.get('user_departments').disable();
    this.role = role;
  }

  getUserDepartments() {
    this.departmentService.getMany(this.paramsDepartment).subscribe(res => (this.userDepartments = res.list));
  }

  getSchools() {
    this.schoolService.getMany(this.params).subscribe(res => (this.schools = res.list));
  }

  create(data: Staff) {
    this.staffService.createFile(data).subscribe({
      next: res => {
        this.isLoading = false;
        this.snackbarService.onShowSnackbar({ message: 'add' });
        this.router.navigate(['../info', res._id], { relativeTo: this.route });
      }
    });
  }

  update(data: Staff) {
    this.staffService.updateFile(this.staffId, data).subscribe({
      next: res => {
        this.isLoading = false;
        this.snackbarService.onShowSnackbar({ message: 'add' });
        this.router.navigate(['../../info', res._id], { relativeTo: this.route });
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.isLoading = true;

    const formValue = this.form.value;
    delete formValue.confirm_password;

    const data = {
      ...formValue,
      date_of_birth: this.formattedDate(formValue.date_of_birth),
      place_of_birth: JSON.stringify(formValue.place_of_birth),
      address: JSON.stringify(formValue.address),
      username: formValue.username ? formValue.username.trim() : ''
    };

    if (!this.staffId) {
      // create
      this.create(data);
    } else {
      // update
      delete data.username;
      this.update(data);
    }
  }

  //TODO: searching functions
  timer: ReturnType<typeof setTimeout>;
  onSearch(value: string): void {
    this.params.search = value;
    this.startSearch();
  }

  startSearch(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getSchools();
    }, 500);
  }

  onSearchDepartment(value: string): void {
    this.paramsDepartment.search = value;
    this.startSearchDepartment();
  }

  startSearchDepartment(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getUserDepartments();
    }, 500);
  }
}
