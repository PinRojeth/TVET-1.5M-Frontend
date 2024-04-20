import { formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, takeUntil } from 'rxjs';
import { datePickerValidator } from 'src/app/helpers/datepicker-validator';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Address, Nationality } from 'src/app/models/address';
import { ImageList } from 'src/app/models/file';
import { Major } from 'src/app/models/major';
import { School } from 'src/app/models/school';
import { Student } from 'src/app/models/student';
import { TypeEnum } from 'src/app/models/type_enum';
import { AddressService } from 'src/app/services/address.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentService } from 'src/app/services/student.service';
import { TypeService } from 'src/app/services/type.service';
import { ConfirmDialogComponent } from 'src/app/shares/confirm-dialog/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-request-editing',
  templateUrl: './student-request-editing.component.html',
  styleUrls: ['./student-request-editing.component.scss']
})
export class StudentRequestEditingComponent {
  private readonly destroyer$ = DESTROYER$();
  private readonly route = inject(ActivatedRoute);

  form: FormGroup;
  today = new Date();

  nationalities: Nationality[] = [];
  typeScholarshipDocuments: TypeEnum[] = [];
  institute: School[];
  applyMajor: Major[];
  supportFiles: string[] = ['image/png', 'image/jpeg', 'image/jpg'];
  imageList: ImageList[] = [];
  imageRemovedList: string[] = [];

  profileImage: string = null;
  studentId: string = this.route.snapshot.paramMap.get('studentRequestId');
  supportFileLabel: string = 'PNG, JPEG, JPG';
  acceptTypes: string = '.png, .jpg, .jpeg';
  imageUrl: string;

  student: any;
  address: Address;
  placeOfBirth: Address;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private snackbarService: SnackbarService,
    public studentService: StudentService,
    public translate: TranslateService,
    private addressService: AddressService,
    private typeService: TypeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.getNationalities();
    this.getScholarshipDocument();
    this.getDetail();
  }

  get formValue() {
    return this.form.value;
  }

  private initFormGroup(): void {
    this.form = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      first_name_en: [null],
      last_name_en: [null],
      date_of_birth: [null, [Validators.required, datePickerValidator()]],
      gender: [null, Validators.required],
      phone_number: [null],
      ethnicity: [null],
      nationality: [null],
      type_scholarship_documents: [null],
      id_card_number: [null],
      place_of_birth: this.formBuilder.group({
        city_provinces: [null, Validators.required],
        districts: [null, Validators.required],
        communes: [null, Validators.required],
        villages: [null],
        detail: [null]
      }),
      address: this.formBuilder.group({
        city_provinces: [null, Validators.required],
        districts: [null, Validators.required],
        communes: [null, Validators.required],
        villages: [null, Validators.required],
        detail: [null]
      }),
      profile_image: [null],
      remove_profile_image: [false],
      attachment_files: [null],
      remove_attachment_files: [null]
    });
  }

  onSubmit(): void {
    if (!this.form.valid) return this.form.markAllAsTouched();

    //file attachment
    let fileObject;
    if (this.form.value?.attachment_files?.length > 0) {
      let allFile: string[] = this.form.value?.attachment_files.map(map => {
        return map.attachment_data;
      });

      for (const [index, item] of allFile.entries()) {
        fileObject = { ...fileObject, [`attachment_files[${index}]`]: item };
      }
    }

    //files from api that is removed
    let removeFiles;
    if (this.form.value?.remove_attachment_files?.length > 0) {
      let allRemovedFile: string[] = this.form.value?.remove_attachment_files;
      for (const [index, item] of allRemovedFile.entries()) {
        removeFiles = { ...removeFiles, [`remove_attachment_files[${index}]`]: item };
      }
    }

    const DATA = Object.assign({
      ...this.formValue,
      date_of_birth: this.formattedDate(this.formValue.date_of_birth),
      place_of_birth: JSON.stringify(this.formValue.place_of_birth),
      address: JSON.stringify(this.formValue.address),
      username: this.formValue.username ? this.formValue.username.trim() : '',
      ...fileObject,
      ...removeFiles
    });
    delete DATA.remove_attachment_files;
    const API: Observable<Student> = this.studentService.updateFile(this.studentId, DATA);
    API.pipe(takeUntil(this.destroyer$)).subscribe({
      next: res => {
        const id: string = res._id;
        this.snackbarService.onShowSnackbar({ message: 'edit' });

        this.router.navigate(['../../', 'info', this.studentId], { relativeTo: this.route });
      }
    });
  }

  private getDetail(): void {
    this.studentService
      .getOne(this.studentId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        this.imageList = res?.attachment_files?.map(map => {
          return { _id: String(map), attachment_data: String(map) };
        });

        this.form.patchValue({
          first_name: res.first_name,
          last_name: res.last_name,
          first_name_en: res.first_name_en,
          last_name_en: res.last_name_en,
          date_of_birth: res.date_of_birth,
          gender: res.gender,
          phone_number: res.phone_number,
          id_card_number: res.id_card_number,
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
          nationality: res?.nationality?._id,
          type_scholarship_documents: res?.type_scholarship_documents?._id,
          ethnicity: res?.ethnicity?._id,
          attachment_files: this.imageList
        });

        if (!res?.nationality?._id) {
          this.form.patchValue({
            nationality: this.nationalities[0]._id,
            ethnicity: this.nationalities[0]._id
          });
        }

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

  private getNationalities(): void {
    this.addressService
      .getNationality()
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        this.nationalities = res.list;
      });
  }

  private getScholarshipDocument(): void {
    this.typeService
      .getScholarshipDocument()
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        this.typeScholarshipDocuments = res.list;
      });
  }

  uploadFileList(event: FileList): void {
    if (event.length > 0) {
      let invalidFile = 'assets/imgs/document-unknown.svg';
      let numberOfFiles = event.length;
      let supportImage = ['image/jpeg', 'image/png', 'image/jpg'];
      for (let i = 0; i < numberOfFiles; i++) {
        if (supportImage.includes(event[i].type)) {
          //Check type of file uploaded
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageList.push({
              attachment_data: event[i],
              image_binary: e.target.result,
              _id:
                this.imageList.length < 1 || typeof this.imageList[this.imageList.length - 1]._id === 'string'
                  ? 1
                  : +this.imageList[this.imageList.length - 1]._id + 1
            });

            //set file to attachment form
            this.form.controls.attachment_files.setValue(this.imageList);
          };
          reader.readAsDataURL(event[i]);
        } else {
          let data = {
            icon: invalidFile,
            title: 'form.unsupported_file',
            message: 'form.support_files'
          };
          this.dialog.open(ConfirmDialogComponent, {
            width: '420px',
            data
          });
        }
      }
    }
  }

  removeImage(data: ImageList): void {
    this.imageList = this.imageList.filter(fil => fil._id !== data._id);
    if (!(data.attachment_data instanceof File)) {
      this.imageRemovedList.push(data.attachment_data?.toString());
    }

    //set file to attachment form
    this.form.controls.attachment_files.setValue(this.imageList);

    //catch ids of removed file
    this.form.controls.remove_attachment_files.setValue(this.imageRemovedList);
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}
