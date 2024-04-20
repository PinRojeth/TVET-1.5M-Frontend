import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { MY_FORMATS } from 'src/app/helpers/my-date-formats';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { Address, CityProvince, Commune, District, Village } from 'src/app/models/address';
import { BaseKeyAddressEnum } from 'src/app/models/enums/enumConstant';
import { AddressService } from 'src/app/services/address.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AddressComponent extends Unsubscribe implements OnInit {
  //base address enum
  baseAddressEnum: typeof BaseKeyAddressEnum = BaseKeyAddressEnum;

  //base address variables
  [BaseKeyAddressEnum.BASE_PROVINCE]: CityProvince[];
  [BaseKeyAddressEnum.BASE_DISTRICT]: District[];
  [BaseKeyAddressEnum.BASE_COMMUNE]: Commune[];
  [BaseKeyAddressEnum.BASE_VILLAGE]: Village[];

  cityProvince: CityProvince[];
  district: District[];
  commune: Commune[];
  village: Village[];

  //variable of searching form
  searchValue: string = null;

  selectEvent: boolean;

  form!: FormGroup;

  @Input() formGroupName: 'address' | 'place_of_birth';
  @Input() set addressData(data: Address) {
    if (data) {
      this.district = data?.districts ? [data.districts] : null;
      this.village = data?.villages ? [data.villages] : null;
      this.commune = data?.communes ? [data.communes] : null;
    }
  }

  @Output() formEvent: EventEmitter<FormGroup> = new EventEmitter();

  constructor(
    public translate: TranslateService,
    private addressService: AddressService,
    private rootFormGroup: FormGroupDirective
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.controls[this.formGroupName] as FormGroup;
    this.getCityProvince();

    //to emit form to parent so that it should avoid from non-reactive form
    //this.form.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(value => this.formEvent.emit(this.form));
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

  getDistricts(_id: number): void {
    this.addressService
      .getDistrict(_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.district = res.list;
        this[BaseKeyAddressEnum.BASE_DISTRICT] = res.list;
      });
  }

  getCommune(_id: number): void {
    this.addressService
      .getCommune(_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.commune = res.list;
        this[BaseKeyAddressEnum.BASE_COMMUNE] = res.list;
      });
  }

  getVillage(_id: number): void {
    this.addressService
      .getVillage(_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.village = res.list;
        this[BaseKeyAddressEnum.BASE_VILLAGE] = res.list;
      });
  }

  onCityProvinceChange(_id: number): void {
    this.form.patchValue({
      districts: null,
      communes: null,
      villages: null
    });
    this[BaseKeyAddressEnum.BASE_DISTRICT] = [];
    this[BaseKeyAddressEnum.BASE_COMMUNE] = [];
    this[BaseKeyAddressEnum.BASE_VILLAGE] = [];
    this.district = [];
    this.commune = [];
    this.village = [];
    this.getDistricts(_id);
  }

  onDistrictsChange(_id: number): void {
    this.form.patchValue({
      communes: null,
      villages: null
    });
    this[BaseKeyAddressEnum.BASE_COMMUNE] = [];
    this[BaseKeyAddressEnum.BASE_VILLAGE] = [];
    this.commune = [];
    this.village = [];
    this.getCommune(_id);
  }

  onCommuneChange(_id: number): void {
    this.form.patchValue({
      villages: null
    });
    this[BaseKeyAddressEnum.BASE_VILLAGE] = [];
    this.village = [];
    this.getVillage(_id);
  }

  onDistrictClick(): void {
    if (this.form.get('city_provinces').value == undefined) return;
    this.getDistricts(this.form.get('city_provinces').value);
  }

  onCommuneClick(): void {
    if (this.form.get('districts').value == undefined) return;
    this.getCommune(this.form.get('districts').value);
  }

  onVillageClick(): void {
    if (this.form.get('communes').value == undefined) return;
    this.getVillage(this.form.get('communes').value);
  }
}
