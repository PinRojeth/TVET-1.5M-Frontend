import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { passwordMatcher } from 'src/app/helpers/password-matcher';
import { pAdmin } from 'src/app/helpers/permission';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { CityProvince, Commune, District, Village } from 'src/app/models/address';
import { BaseKeyAddressEnum } from 'src/app/models/enums/enumConstant';
import { Major } from 'src/app/models/major';
import { School } from 'src/app/models/school';
import { AddressService } from 'src/app/services/address.service';
import { MajorService } from 'src/app/services/major.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SchoolService } from 'src/app/services/school.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-school-operation',
  templateUrl: './school-operation.component.html',
  styleUrls: ['./school-operation.component.scss']
})
export class SchoolOperationComponent extends Unsubscribe implements OnInit {

  pSchool = pAdmin.school;
  schoolId: string;
  form: FormGroup;
  isLoading = false;

  today = new Date();
  majors: Major[];
  pobDistricts: District[];
  pobCommune: Commune[];
  pobVillage: Village[];
  cityProvince: CityProvince[];

  baseAddressEnum: typeof BaseKeyAddressEnum = BaseKeyAddressEnum;

  school: any;
  selectEvent: boolean;
  searchValue: string = null;

  usernameRegex = /^[a-zA-Z][a-zA-Z0-9_\.\-]*$/;
  emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  private formattedDate(date: Date): string {
    return date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : null;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private majorService: MajorService,
    private schoolService: SchoolService,
    private addressService: AddressService,
    private profileService: ProfileService,
    private snackbarService: SnackbarService
  ) {
    super();
    this.schoolId = this.route.snapshot.paramMap.get('schoolId');
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.initFormGroup();
    this.getCityProvince();
    // this.getMajors();

    if (!this.schoolId) return;
    this.getInfo();
  }

  initFormGroup() {
    this.form = this.fb.group({
      profile_image: [null],
      remove_profile_image: [false],
      name: ['', Validators.required],
      name_en: ['', Validators.required],
      code: ['', Validators.required],
      code_en: ['', Validators.required],
      description: [''],
      first_name: [{ value: null, disabled: !!this.schoolId }, Validators.required],
      last_name: [{ value: null, disabled: !!this.schoolId }, Validators.required],
      username: [null, [Validators.required, Validators.minLength(6), Validators.pattern(this.usernameRegex)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirm_password: [null, [Validators.required, Validators.minLength(8)]],
      address: this.fb.group({
        city_provinces: [null, Validators.required],
        districts: [null, Validators.required],
        communes: [null, Validators.required],
        villages: [null, Validators.required]
      }),
      // apply_majors: [null, Validators.required],
      phone_number: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      website: [null],
      create_by: [null],
      create_number: [null],
      create_date: [null],
      register_by: [null],
      register_number: [null],
      register_date: [null],
      id_code: [null]
    },
      {
        validators: passwordMatcher('password', 'confirm_password'),
      });
  }

  getMajors() {
    this.majorService.getMany({ limit: 0, page: 1 }).subscribe({
      next: (res) => {
        this.majors = res.list;
      }
    });
  }

  getInfo() {
    this.schoolService.getById(this.schoolId).subscribe({
      next: (res) => {
        this.school = res;
        this.patchFormGroup(res);
      }
    });
  }

  patchFormGroup(res: School) {

    // let apply_majors = [];
    // if (res.apply_majors) {
    //   res.apply_majors.forEach(element => {
    //     apply_majors.push(element?._id);
    //   });
    // }

    this.form.patchValue({
      profile_image: res?.profile_image,
      name: res?.name,
      name_en: res?.name_en,
      code: res?.code,
      description: res?.description,
      address: {
        city_provinces: res.address?.city_provinces?._id,
        districts: res.address?.districts?._id,
        communes: res.address?.communes?._id,
        villages: res.address?.villages?._id,
        detail: res.address?.detail
      },
      // apply_majors,
      code_en: res?.code_en,
      phone_number: res?.phone_number,
      email: res?.email,
      website: res?.website,
      create_by: res?.create_by,
      create_number: res?.create_number,
      create_date: res?.create_date,
      register_by: res?.register_by,
      register_number: res?.register_number,
      register_date: res?.register_date,
      id_code: res?.id_code
    });

    // place of birth
    this.pobDistricts = res.address?.districts ? [res.address.districts] : null;
    this.pobCommune = res.address?.communes ? [res.address.communes] : null;
    this.pobVillage = res.address?.villages ? [res.address.villages] : null;

    // clear validation: username, password, confirm_password
    this.form.controls['username'].setErrors(null);
    this.form.controls['password'].setErrors(null);
    this.form.controls['confirm_password'].setErrors(null);
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  getCityProvince(): void {
    this.addressService
      .getCityProvince()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.cityProvince = res.list;
        this[BaseKeyAddressEnum.BASE_PROVINCE] = res.list;
      });
  }

  getPOBDistricts(_id: number): void {
    this.addressService
      .getDistrict(_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.pobDistricts = res.list;
        this[BaseKeyAddressEnum.BASE_DISTRICT] = res.list;
      });
  }

  getPOBCommune(_id: number): void {
    this.addressService
      .getCommune(_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.pobCommune = res.list;
        this[BaseKeyAddressEnum.BASE_COMMUNE] = res.list;
      });
  }

  getPOBVillage(_id: number): void {
    this.addressService
      .getVillage(_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.pobVillage = res.list;
        this[BaseKeyAddressEnum.BASE_VILLAGE] = res.list;
      });
  }

  onPOBCityProvinceChange(_id: number): void {
    this.form.patchValue({
      address: {
        districts: null,
        communes: null,
        villages: null
      }
    });
    this[BaseKeyAddressEnum.BASE_DISTRICT] = [];
    this[BaseKeyAddressEnum.BASE_COMMUNE] = [];
    this[BaseKeyAddressEnum.BASE_VILLAGE] = [];
    this.pobDistricts = [];
    this.pobCommune = [];
    this.pobVillage = [];
    this.getPOBDistricts(_id);
  }

  onPOBDistrictsChange(_id: number): void {
    this.form.patchValue({
      address: {
        communes: null,
        villages: null
      }
    });
    this[BaseKeyAddressEnum.BASE_COMMUNE] = [];
    this[BaseKeyAddressEnum.BASE_VILLAGE] = [];
    this.pobCommune = [];
    this.pobVillage = [];
    this.getPOBCommune(_id);
  }

  onPOBCommuneChange(_id: number): void {
    this.form.patchValue({
      address: {
        villages: null
      }
    });
    this[BaseKeyAddressEnum.BASE_VILLAGE] = [];
    this.pobVillage = [];
    this.getPOBVillage(_id);
  }

  onPOBDistrictClick(): void {
    if (this.form.get('address.city_provinces').value == undefined) return;
    this.getPOBDistricts(this.form.get('address.city_provinces').value);
  }

  onPOBCommuneClick(): void {
    if (this.form.get('address.districts').value == undefined) return;
    this.getPOBCommune(this.form.get('address.districts').value);
  }

  onPOBVillageClick(): void {
    if (this.form.get('address.communes').value == undefined) return;
    this.getPOBVillage(this.form.get('address.communes').value);
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

  timeoutRef: any;
  validateUsername(event: any) {
    if (this.form.controls.username.invalid) return;
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
    this.timeoutRef = setTimeout(() => {
      this.profileService.checkExistedUser({ username: event?.target.value }).subscribe((res: any) => {
        this.timeoutRef = null;
        if (res['exist']) {
          this.form.controls.username.markAllAsTouched();
          this.form.controls.username.setErrors({ user_exist: true })
        }
      })
    }, 600);
  }

  //* Check Name Already Existed
  onCheckExist(value: string) {
    if (value) {
      this.startCheckExist(value);
    }
  }

  searchExistTimer: any;
  startCheckExist(value: string) {
    clearTimeout(this.searchExistTimer);
    this.searchExistTimer = setTimeout(() => {
      this.checkExisted(value);
    }, 500);
  }

  checkExisted(value: string) {
    const data = {
      _id: this.schoolId ? this.schoolId : null,
      name: value.trim()
    };
    this.schoolService.checkNameExist(data).subscribe(
      res => {
        if (res['exist']) {
          this.form.controls['name'].setErrors({ existed: true });
        }
      }
    );
  }

  create(data: School) {
    this.schoolService.createSchool(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackbarService.onShowSnackbar({ message: 'add' });
        this.router.navigate(['../info', res._id], { relativeTo: this.route });
      }
    });
  }

  update(data: School) {
    this.schoolService.updateFile(this.schoolId, data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackbarService.onShowSnackbar({ message: 'add' });
        this.router.navigate(['../../info', res._id], { relativeTo: this.route });
      }
    });
  }

  onSubmit() {

    if (!this.form.valid) return;
    this.isLoading = true;

    let formValue = this.form.value;
    // if (formValue.apply_majors?.length > 0) {
    //   for (let [i, item] of formValue.apply_majors.entries()) {
    //     formValue["apply_majors[" + i + "]"] = item;
    //   }
    // }
    delete formValue.confirm_password;
    // delete formValue.apply_majors;
    const data = {
      ...formValue,
      create_date: this.formattedDate(formValue.create_date),
      register_date: this.formattedDate(formValue.register_date),
      address: JSON.stringify(formValue.address)
    };

    if (!this.schoolId) {
      // create
      this.create(data);
    } else {
      // update
      this.update(data);
    }
  }

}
