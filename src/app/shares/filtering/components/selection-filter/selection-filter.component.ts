import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selection-filter',
  templateUrl: './selection-filter.component.html',
  styleUrls: ['./selection-filter.component.scss']
})
export class SelectionFilterComponent implements OnInit {

  @Output() queryEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(value: string) {
    this.queryEvent.emit(value);
  }

  clear() {
    this.queryEvent.emit('');
  }

}
