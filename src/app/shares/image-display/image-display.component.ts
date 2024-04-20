import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {
  isLoading: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ImageDisplayComponent>
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
