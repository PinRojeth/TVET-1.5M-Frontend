import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { School } from 'src/app/models/school';
import { ConfirmDialogComponent } from 'src/app/shares/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { StaticFilePipe } from 'src/app/shares/static-file/pipes/static-file.pipe';

@Component({
  selector: 'app-school-image-uploader',
  templateUrl: './school-image-uploader.component.html',
  styleUrls: ['./school-image-uploader.component.scss']
})
export class SchoolImageUploaderComponent implements OnInit {
  imageUrl: string;
  imagePreview: string;
  defaultImage = '/assets/imgs/school.svg';
  hasFile = false;

  @Input() school: School;
  @Input() status: 'upload' | 'view' = 'upload';
  @Output() uploadImageEvent = new EventEmitter<any>();

  constructor(private staticFilePipe: StaticFilePipe, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.school?.profile_image && (this.school?.profile_image !== this.defaultImage)) {
      this.imageUrl = (this.staticFilePipe.transform(this.school?.profile_image) + '?image_size=m') as string;
      this.imagePreview = this.staticFilePipe.transform(this.school?.profile_image) as string;
      this.hasFile = true;
    } else this.hasFile = false;
  }

  fileChangeEvent(event: Event) {
    const value = event.target as HTMLInputElement;
    const file = value.files[0];
    const bytesToMegaBytes = bytes => bytes / 1024 ** 2;
    if (+bytesToMegaBytes(file.size).toFixed(2) > 5) {
      let data = {
        icon: 'assets/imgs/document-unknown.svg',
        title: 'Excessively Large File',
        message: 'Max file size: 5MB'
      };
      return this.dialog.open(ConfirmDialogComponent, {
        width: '420px',
        data
      });
    }

    this.imageUrl = '';
    this.imagePreview = '';
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
      this.imagePreview = e.target.result;
      this.hasFile = true;
    };
    this.uploadImageEvent.emit(file);
  }

  removeFile() {
    this.imageUrl = null;
    this.imagePreview = null;
    this.hasFile = false;
    this.uploadImageEvent.emit(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.school?.profile_image && this.school?.profile_image !== this.defaultImage) {
      this.imageUrl = (this.staticFilePipe.transform(this.school?.profile_image) + '?image_size=m') as string;
      this.imagePreview = this.staticFilePipe.transform(this.school?.profile_image) as string;
      this.hasFile = true;
    } else this.hasFile = false;
  }
}
