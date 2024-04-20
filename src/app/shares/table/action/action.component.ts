/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddButton, ButtonPermission, ButtonRouter } from 'src/app/models/button';
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Input() permission: ButtonPermission;
  @Input() addButton: AddButton[] = [];
  @Input() useRouter: ButtonRouter;

  @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();

  initPerms: ButtonPermission = { view: true, edit: true, delete: true };

  permsLength: number;

  newButtonValidPerm: AddButton;

  constructor() {}

  ngOnInit(): void {
    this.addButton = this.addButton ?? [];

    //Merge permissions
    this.permission = { ...this.initPerms, ...this.permission };

    //assign true value to permission if permission is undefined
    this.addButton = this.addButton.map(map => {
      return { permission: true, ...map };
    });

    //get newly added permission button that is accessible
    let addButtonPermsValid = this.addButton.filter(fil => fil.permission);
    if (addButtonPermsValid.length < 2) this.newButtonValidPerm = addButtonPermsValid[0];

    //check if new button has only one permission which is true
    if (addButtonPermsValid?.length === 1 && this.addButton.length > 1) {
      this.addButton = this.addButton.filter(fil => fil.permission);
    }

    this.permsLength = this.permission
      ? Object.values(this.permission).filter(fil => fil).length + addButtonPermsValid?.length
      : addButtonPermsValid?.length;
  }

  hasKey(key: string): boolean {
    return Object.keys(this.useRouter).includes(key);
  }

  convertKey(key: string): string {
    return key.replace(/ /g, '_').toLowerCase();
  }

  onClick(label: string): void {
    this.clickEvent.emit(label.replace(/ /g, '_').toLowerCase());
  }

  trackByFn(index: number, item: any): void {
    return item._id;
  }
}
