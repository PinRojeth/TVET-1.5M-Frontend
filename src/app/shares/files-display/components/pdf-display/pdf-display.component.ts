import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DownloadableEnum } from 'src/app/models/enums/enumConstant';

@Component({
  selector: 'app-pdf-display',
  templateUrl: './pdf-display.component.html',
  styleUrls: ['./pdf-display.component.scss']
})
export class PdfDisplayComponent {

  src: string = "";
  showDownloadButton: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    if (typeof this.data === "string") {
      this.src = this.data;
    } else if (typeof this.data === "object") {
      this.src = this.data?.url;
      this.showDownloadButton = (this.data?.item?.downloadable == DownloadableEnum.enable) ? true : false;
    }
  }
}
