import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  fileName: string;
  defaultImage = '/assets/imgs/file.svg';
  hasFile = false;

  @Input() file: string = '';
  @Output() uploadCVEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if (!changes.file.currentValue) return;

    this.hasFile = true;
    this.fileName = changes.file.currentValue
      ? changes.file.currentValue
      : this.defaultImage;
  }


  fileChangeEvent(event: any) {
    this.fileName = '';
    const file = event.target.files[0];
    this.fileName = file.name;
    this.hasFile = true;
    this.uploadCVEvent.emit(file);
  }

  removeFile() {
    this.fileName = this.defaultImage;
    this.hasFile = false;
    this.uploadCVEvent.emit(null);
  }

}
