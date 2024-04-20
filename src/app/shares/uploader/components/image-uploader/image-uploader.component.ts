import { TranslateService } from '@ngx-translate/core';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Staff } from 'src/app/models/staff';
import { User } from 'src/app/models/user';
import { StaticFilePipe } from 'src/app/shares/static-file/pipes/static-file.pipe';
import { Student } from 'src/app/models/student';
@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  imageUrl: string;
  ImageUrlPreview: string;
  hasFile = false;

  @Input() payload: Staff | Student;
  @Input() status: 'upload' | 'view' = 'upload';
  @Output() uploadImageEvent = new EventEmitter<any>();
  @Input() isRequired: boolean = false;

  constructor(private staticFilePipe: StaticFilePipe, public translate: TranslateService) {}

  ngOnInit(): void {
    // console.log(this.payload.profile_image);
    
    if (
      this.payload?.profile_image &&
      this.payload?.profile_image !== '/assets/imgs/female.svg' &&
      this.payload?.profile_image !== '/assets/imgs/male.svg'
    ) {
      this.imageUrl = (this.staticFilePipe.transform(this.payload?.profile_image) + '?image_size=m') as string;
      this.ImageUrlPreview = this.staticFilePipe.transform(this.payload?.profile_image) as string;
      this.hasFile = true;
    } else this.hasFile = false;
  }

  fileChangeEvent(event: Event) {
    const value = event.target as HTMLInputElement;
    const file = value.files[0];
    // const bytesToMegaBytes = bytes => bytes / 1024 ** 2;
    // if (+bytesToMegaBytes(file.size).toFixed(2) > 5) {
    //   let data = {
    //     icon: 'assets/imgs/document-unknown.svg',
    //     title: 'Excessively Large File',
    //     message: 'Max file size: 5MB'
    //   };
    //   return this.dialog.open(ConfirmDialogComponent, {
    //     width: '420px',
    //     data
    //   });
    // }

    this.imageUrl = '';
    this.ImageUrlPreview = '';
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
      this.ImageUrlPreview = e.target.result;
      this.hasFile = true;
    };
    this.uploadImageEvent.emit(file);
  }

  removeFile() {
    this.imageUrl = null;
    this.ImageUrlPreview = null;
    this.hasFile = false;
    this.uploadImageEvent.emit(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.payload?.profile_image &&
      this.payload?.profile_image !== '/assets/imgs/female.svg' &&
      this.payload?.profile_image !== '/assets/imgs/male.svg'
    ) {
      // this.imageUrl = this.payload?.profile_image;
      this.imageUrl = (this.staticFilePipe.transform(this.payload?.profile_image) + '?image_size=m') as string;
      this.ImageUrlPreview = this.staticFilePipe.transform(this.payload?.profile_image) as string;
      this.hasFile = true;
    } else this.hasFile = false;
  }
}
