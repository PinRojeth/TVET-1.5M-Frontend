/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-attachment',
  templateUrl: './file-attachment.component.html',
  styleUrls: ['./file-attachment.component.scss']
})
export class FileAttachmentComponent implements OnInit {
  @Input() fileName: string;
  @Output() uploadImageChange = new EventEmitter();
  @Input() isDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  fileChangeEvent(event: any) {
    this.fileName = '';
    const file = event.target.files[0];
    this.fileName = file.name;
    this.uploadImageChange.emit(file);
  }

  removeFile() {
    this.fileName = null;
    this.uploadImageChange.emit(null);
  }
}
