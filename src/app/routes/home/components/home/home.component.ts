import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { datePickerValidator } from 'src/app/helpers/datepicker-validator';
import { MY_FORMATS } from 'src/app/helpers/my-date-formats';
import { Address } from 'src/app/models/address';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { TableColumn } from 'src/app/models/table-column';
import { User } from 'src/app/models/user';

import Quill from 'quill';
import ImageResize from 'quill-image-resize-module--fix-imports-error';
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  addressData: Address;

  tableColumns: TableColumn[] = [
    {
      name: 'table.name',
      dataKey: 'name',
      custom: true,
      isSortable: true
    },
    {
      name: 'table.gender',
      dataKey: 'gender',
      custom: true
    },
    {
      name: 'table.phone',
      dataKey: 'phone',
      custom: true
    },
    {
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<Partial<User>> = {
    page: 1,
    limit: 10,
    list: [
      {
        first_name: 'Sunnix',
        last_name: 'Touch',
        gender: 'Male',
        phone_number: '0971234567'
      }
    ],
    total: 30
  };

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
      [{ 'direction': 'rtl' }], // text direction,

      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme

      ['link', 'image']
    ],
    imageResize: {
      modules: ['Resize', 'DisplaySize']
    }
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  private initFormGroup(): void {
    this.form = this.formBuilder.group({
      code: [null],
      titles: [null],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      first_name_en: [null, Validators.required],
      last_name_en: [null, Validators.required],
      date_of_birth: [null, [Validators.required, datePickerValidator()]],
      gender: [null, Validators.required],
      roles: [null, Validators.required],
      phone_number: [null],
      address: this.formBuilder.group({
        city_provinces: [null, Validators.required],
        districts: [null, Validators.required],
        communes: [null, Validators.required],
        villages: [null, Validators.required],
        detail: [null]
      }),
      descriptions: [null, Validators.required]
    });
  }

  onSubmit(): void {
    return this.form.markAllAsTouched();
  }
}
