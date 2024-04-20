import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-office-display',
  templateUrl: './office-display.component.html',
  styleUrls: ['./office-display.component.scss']
})
export class OfficeDisplayComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

}
