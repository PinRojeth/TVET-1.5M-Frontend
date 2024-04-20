import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from './pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  pageList!: number[];
  start!: number;
  private _total!: number;
  end!: number;
  last!: number;
  private _page!: number;
  private _limit!: number;
  pageOptions = [10, 20, 50, 100, 0];
  constructor() { }

  ngOnInit() {
    this.update();
  }

  @Input()
  set total(total: number) {
    this._total = total;
    if (this.total && this.page && this.limit) {
      this.update();
    }
  }

  get total(): number {
    return this._total;
  }

  @Input()
  set page(page: number) {
    this._page = page;
    this.update();
  }

  get page(): number {
    return this._page;
  }

  @Input()
  set limit(limit: number) {
    this._limit = limit;
    if (this.total && this.page && this.limit) {
      this.update();
    }
  }

  get limit(): number {
    return this._limit;
  }

  @Input() surroundButton!: number;

  @Output() changed = new EventEmitter<Pagination>();

  goTo(page: number) {
    this.changed.emit({
      page,
      limit: this.limit
    });
    // this._page = page;
    this.update();
  }

  update() {
    if (this.total > 0) {
      this.last = Math.ceil(this._total / this.limit);
      this.start =
        this._page - Math.ceil(this.surroundButton / 2) > 0 ? this._page - Math.ceil(this.surroundButton / 2) : 1;
      this.end =
        this._page + Math.ceil(this.surroundButton / 2) < this.last
          ? this._page + Math.ceil(this.surroundButton / 2)
          : this.last;
      if (this.end - this.start < this.surroundButton) {
        if (this.end < this.last) {
          this.end = this.start + this.surroundButton < this.last ? this.start + this.surroundButton : this.last;
        }

        if (this.start > 1) {
          this.start = this.end - this.surroundButton > 1 ? this.end - this.surroundButton : 1;
        }
      }
      this.pageList = [];
      for (var i = this.start; i <= this.end; i++) {
        this.pageList.push(i);
      }
    } else {
      this.pageList = [];
    }
  }
}
