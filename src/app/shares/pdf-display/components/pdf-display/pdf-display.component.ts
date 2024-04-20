import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-display',
  templateUrl: './pdf-display.component.html',
  styleUrls: ['./pdf-display.component.scss']
})
export class PdfDisplayComponent {
  isLoading: boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PdfDisplayComponent>) {
    console.log(data)
  }
}
