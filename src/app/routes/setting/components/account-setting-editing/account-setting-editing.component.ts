import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, takeUntil } from 'rxjs';
import { datePickerValidator } from 'src/app/helpers/datepicker-validator';
import { MY_FORMATS } from 'src/app/helpers/my-date-formats';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { Address, Nationality } from 'src/app/models/address';
import { RoleId } from 'src/app/models/enums/enumConstant';
import { Staff } from 'src/app/models/staff';
import { AddressService } from 'src/app/services/address.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-account-setting-editing',
  templateUrl: './account-setting-editing.component.html',
  styleUrls: ['./account-setting-editing.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AccountSettingEditingComponent extends Unsubscribe implements OnInit {
  form: FormGroup;
  today = new Date();

  roles: typeof RoleId = RoleId;

  nationalities: Nationality[] = [];

  tab: string;
  profileImage: string = null;
  fileName: string = null;

  staff: Staff;
  address: Address;
  placeOfBirth: Address;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    public profileService: ProfileService,
    public translate: TranslateService,
    private addressService: AddressService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.getNationalities();
    this.getDetail();
  }

  get formValue() {
    return this.form.value;
  }

  private initFormGroup(): void {
    this.form = this.formBuilder.group(
      {
        first_name: [null, Validators.required],
        last_name: [null, Validators.required],
        first_name_en: [null, Validators.required],
        last_name_en: [null, Validators.required],
        date_of_birth: [null, [Validators.required, datePickerValidator()]],
        gender: [null, Validators.required],
        roles: [null, Validators.required],
        phone_number: [null],
        ethnicity: [null, Validators.required],
        nationality: [null, Validators.required],
        place_of_birth: this.formBuilder.group({
          city_provinces: [null],
          districts: [null],
          communes: [null],
          villages: [null],
          detail: [null]
        }),
        address: this.formBuilder.group({
          city_provinces: [null],
          districts: [null],
          communes: [null],
          villages: [null],
          detail: [null]
        }),
        profile_image: [null],
        remove_profile_image: [false],
      }
    );
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    const DATA = {
      ...this.formValue,
      date_of_birth: this.formattedDate(this.formValue.date_of_birth),
      place_of_birth: JSON.stringify(this.formValue.place_of_birth),
      address: JSON.stringify(this.formValue.address)
    };

    const API: Observable<Staff> = this.profileService.updateMyInfo(DATA);
    API.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: res => {
        this.snackbarService.onShowSnackbar({ message: 'edit' });

        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
      }
    });
  }

  private getDetail(): void {
    const API: Observable<Staff> = this.profileService.getAccountInfo();
    API.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.staff = {
        ...res
      };
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
        roles: res.roles?._id ?? res.users.roles,
        nationality: res?.nationality?._id,
        ethnicity: res?.ethnicity?._id
      });

      // file
      this.profileImage = res?.profile_image;

      this.address = res.address;
      this.placeOfBirth = res.place_of_birth;
    });
  }

  private formattedDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  // file change
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

  private getNationalities() {
    this.addressService.getNationality().subscribe(res => {
      this.nationalities = res.list;
    });
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}
